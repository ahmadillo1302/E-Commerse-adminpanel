"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetAllReviewsQuery, useDeleteOneReviewMutation } from "@/app/redux/api/allApi";

export default function ViewReviews() {
  const { data: reviews, isLoading, error, refetch } = useGetAllReviewsQuery();

  const [deleteReview] = useDeleteOneReviewMutation();
  const removeReview = async (id) => {
    try {
      await deleteReview(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Reviews</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews?.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell>{review.user?.firstname || "Unknown"}</TableCell>
              <TableCell>{review.product?.name || "Unknown Product"}</TableCell>
              <TableCell>{review.rating} ⭐</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => removeReview(review.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
