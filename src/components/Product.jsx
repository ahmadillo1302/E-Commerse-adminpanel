"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Trash, X } from "lucide-react";
import {
  useApproveProductMutation,
  useDeleteImageOfProductMutation,
  useDeleteOneProductMutation,
  useGetAllNotApprovedProductsQuery,
  useGetAllProductsQuery,
} from "@/app/redux/api/allApi";
import { Button } from "./ui/button";
import EditProductModal from "./EditProduct";
import Image from "next/image";

export default function DashboardProducts({ status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products,
    refetch,
    error,
    isLoading,
  } = status === "notApproved"
    ? useGetAllNotApprovedProductsQuery()
    : useGetAllProductsQuery();

  console.log(products);

  const [approveProduct] = useApproveProductMutation();
  const [deleteProduct] = useDeleteOneProductMutation();
  const [deleteImage] = useDeleteImageOfProductMutation();

  const GetItApproved = (id) => {
    approveProduct(id);
    refetch();
  };

  const deleteOneProduct = (id) => {
    deleteProduct(id);
    window.location.href = "/dashboard/notApprovedProducts";
  };

  const deleteImageOfProduct = (id, body) => {
    deleteImage({ id, body });
    window.location.href = "/dashboard/notApprovedProducts";
  };

  const handleImageClick = (product) => {
    setSelectedImages(product.images);
    setCurrentImageIndex(0);
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const modalniYop = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") modalniYop();
    };
    if (isModalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (isLoading)
    return <p className="text-center text-gray-600 py-8">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 py-8">Error loading products!</p>
    );

  return (
    <div className="container mx-auto px-4 py-6 w-full max-w-[100vw] overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6 md:text-xl sm:text-lg">
        Products
      </h2>
      <div className="min-w-[768px] lg:min-w-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead className="hidden lg:table-cell">Narxi</TableHead>
              <TableHead>Rasmlar</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="hidden md:table-cell">
                  {product.id}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {product.price.toLocaleString()} so'm
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {product.images?.length > 0 ? (
                      product.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative w-10 h-10 cursor-pointer group sm:w-8 sm:h-8"
                          onClick={() => handleImageClick(product)}
                        >
                          <Image
                            src={`http://localhost:4000${img.image_url}`}
                            alt={`Product ${index}`}
                            fill
                            className="w-full h-full rounded-md object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Rasm yo‘q</span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <EditProductModal productId={product.id} />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteOneProduct(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white p-4 rounded-lg w-full max-w-3xl max-h-[90vh] relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={modalniYop}
              className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full z-50"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative flex items-center justify-center h-[60vh] sm:h-[50vh]">
              <button
                onClick={handlePrevImage}
                className="absolute left-2 p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <img
                src={`http://localhost:3000/${selectedImages[currentImageIndex]}`}
                alt="Selected"
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={handleNextImage}
                className="absolute right-2 p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  deleteImageOfProduct(
                    selectedProduct.id,
                    selectedImages[currentImageIndex]
                  )
                }
                className="absolute bottom-2 left-2 p-1 bg-red-100 text-red-600 rounded flex items-center gap-1 text-sm"
              >
                <Trash className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
