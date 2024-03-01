import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    reducerPath: "adminApi",
    tagTypes: ["user", "products", "customers", "transactions", "countries", "sales", "admins", "performance", "dashboard"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => ({
                url: `/general/user/${id}`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result)
                console.log("All users: ", arg)
                return ["user"]
            }
        }),
        getProducts: builder.query({
            query: () => ({
                url: `/client/products`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All products: ", result)
                return ["products"]
            }
        }),
        getCustomers: builder.query({
            query: () => ({
                url: `/client/customers`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All customers", result)
                return ["customers"]
            }
        }),
        getTransactions: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: '/client/transactions',
                method: 'get',
                params: { page, pageSize, sort, search }
            }),
            providesTags: (result, err, arg) => {
                console.log("All transactions: ", result)
                return ["transactions"]
            }
        }),
        getGeography: builder.query({
            query: () => ({
                url: '/client/geography',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All the country details: ", result)
                return ["countries"]
            }
        }),
        getSales: builder.query({
            query: () => ({
                url: '/sales/sales',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All sales: ", result)
                return ["sales"]
            }
        }),
        getAdmins: builder.query({
            query: () => ({
                url: '/management/admins',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All admins: ", result)
                return ["admins"]
            }
        }),
        getPerformance: builder.query({
            query: (id) => ({
                url: `/management/performance/${id}`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All performance: ", result)
                return ["performance"]
            }
        }),
        getDashboard: builder.query({
            query: () => ({
                url: `/general/dashboard`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("All dashboard info: ", result)
                return ["dashboard"]
            }
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetPerformanceQuery,
    useGetDashboardQuery
} = api
