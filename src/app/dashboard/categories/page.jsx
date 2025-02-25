"use client";

import {
  useCreateCategoryMutation,
  useDeleteOneCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateOneCategoryMutation,
} from "@/app/redux/api/allApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteOneCategoryMutation();
  const [updateCategory] = useUpdateOneCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    await createCategory(formData);
    setFormData({ name: "" });
    refetch();
  };

  const handleEditCategory = async () => {
    await updateCategory({ id: selectedCategory.id, ...formData });
    setIsEditing(false);
    setSelectedCategory(null);
    setFormData({ name: "" });
    refetch();
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      setShowDeleteModal(false);
      refetch();
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name });
    setIsEditing(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="mb-4 flex gap-2">
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Button onClick={isEditing ? handleEditCategory : handleAddCategory}>
          {isEditing ? "Update" : "Create"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(category)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Haqiqatanam o'chirmoqchimisiz chunki bu categoryani o'chirsangiz
              bunga ulangan productlar ham o'chib ketdadi? "
              {categoryToDelete?.title}"?
            </h2>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelDelete}>
                No
              </Button>
              <Button variant="destructive" onClick={handleDeleteCategory}>
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
