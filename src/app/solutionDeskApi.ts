import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const solutionDeskApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUserById: builder.query<any, string>({
      query: (id) => `users/${id}`,
    }),
    getAllUsers: builder.query<
      any,
      { page: string; limit: string; filter: string }
    >({
      query: ({ page, limit, filter }) => {
        return `users?page=${page}&limit=${limit}&filter=${filter}`;
      },

      // keepUnusedDataFor: 240,
    }),
    getFilters: builder.query({
      query: () => `filters`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  util: { getRunningOperationPromises },
} = solutionDeskApi;

// export endpoints for use in SSR
export const { getUserById, getAllUsers, getFilters } =
  solutionDeskApi.endpoints;
