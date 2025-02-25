import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "/users",
    }),

    getAllUserWithRole: builder.query({
      query: (role) => `/users/role/${role}`,
    }),

    getOneUser: builder.query({
      query: (id) => `/users/${id}`,
    }),

    deleteOneUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),

    addAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/users/addAdmin",
        method: "POST",
        body: credentials,
      }),
    }),

    getAllCategories: builder.query({
      query: () => "/categories",
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body: body,
      }),
    }),

    getOneCategory: builder.query({
      query: (id) => `/categories/${id}`,
    }),

    updateOneCategory: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: credentials,
      }),
    }),

    deleteOneCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),

    getAllProducts: builder.query({
      query: () => "/products",
    }),

    getAllNotApprovedProducts: builder.query({
      query: () => "/products/all-notApproved",
    }),

    getOneProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),

    updateOneProduct: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: credentials,
      }),
    }),

    deleteOneProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),

    deleteImageOfProduct: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/products/deleteImage/${id}`,
        method: "PATCH",
        body: credentials,
      }),
    }),

    approveProduct: builder.mutation({
      query: (id) => ({
        url: `/products/approve/${id}`,
        method: "GET",
      }),
    }),

    getAllReviews: builder.query({
      query: () => "/reviews",
    }),

    getAllPayments: builder.query({
      query: () => "/payments",
    }),

    getAllOrders: builder.query({
      query: () => "/orders",
    }),

    getAllOrdersOf: builder.query({
      query: (status) => `/orders/status/${status}`,
    }),
    deleteOneReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetOneUserQuery,
  useDeleteOneUserMutation,
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useUpdateOneCategoryMutation,
  useDeleteOneCategoryMutation,
  useGetAllProductsQuery,
  useGetAllNotApprovedProductsQuery,
  useGetOneProductQuery,
  useUpdateOneProductMutation,
  useDeleteOneProductMutation,
  useDeleteImageOfProductMutation,
  useApproveProductMutation,
  useGetAllReviewsQuery,
  useDeleteOneReviewMutation,
  useCreateCategoryMutation,
  useGetAllUserWithRoleQuery,
  useAddAdminMutation,
  useGetAllOrdersOfQuery,
  useGetAllOrdersQuery,
  useGetAllPaymentsQuery,
} = allApi;
