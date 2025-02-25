"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetAllUserWithRoleQuery,
  useAddAdminMutation,
  useDeleteOneUserMutation,
  useGetOneUserQuery,
  useGetAllUserQuery,
} from "@/app/redux/api/allApi";

//validation admin qo'shish uchun
const adminValidationSchema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .length(9, "Phone number must be exactly 9 digits")
    .required("Phone is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Gender is required"),
  age: yup
    .number()
    .min(1, "Age must be at least 1")
    .max(150, "Age must be at most 150")
    .required("Age is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function ViewUser({ children }) {
  const { data: users, isLoading, error, refetch } = useGetAllUserQuery();

  const [addAdmin] = useAddAdminMutation();
  const [removeUser] = useDeleteOneUserMutation();

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      role: "",
    },
    validationSchema: adminValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Yuborilayotgan ma'lumot:", values);
        await addAdmin({ ...values, role: "admin" }).unwrap();
        resetForm();
        setShowAddAdminModal(false);
        refetch();
      } catch (err) {
        console.error("Failed to add admin:", err);
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 capitalize">{children}</h2>
      {children === "admin" && (
        <div className="mb-4">
          <Button onClick={() => setShowAddAdminModal(true)}>Add Admin</Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.phone_number || "N/A"}</TableCell>
              <TableCell>
                {children !== "admin" && (
                  <div className="mb-4">
                    <Button onClick={() => removeUser(user.id)}>
                      remove user
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showAddAdminModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                {formik.errors.first_name && (
                  <div className="text-red-500">{formik.errors.first_name}</div>
                )}
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                {formik.errors.last_name && (
                  <div className="text-red-500">{formik.errors.last_name}</div>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <div className="text-gray-500">{formik.errors.email}</div>
                )}
              </div>
              <div>
                <Label htmlFor="phone_number">Phone</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
                {formik.errors.phone_number && (
                  <div className="text-red-500">
                    {formik.errors.phone_number}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddAdminModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
