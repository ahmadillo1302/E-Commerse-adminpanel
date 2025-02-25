"use client";
import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AddProductModal() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    images: [],
  });

  const [addProduct, { isLoading, isSuccess, isError, error }] = useadd();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (files ? Array.from(files) : []) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData).unwrap();
      setFormData({
        title: "",
        category_id: "",
        price: "",
        images: [],
      });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category_id" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Images
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              multiple
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </form>

        {isSuccess && (
          <p className="text-green-500">Product added successfully!</p>
        )}
        {isError && (
          <p className="text-red-500">
            {error?.data?.message || "Something went wrong"}
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
}
