import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { IFilterApplied, IUser } from "../types";

type UsersResponse = {
  appliedFilters: IFilterApplied[];
  data: IUser[];
  page: string;
  limit: string;
  totalPages: string;
};
export const solutionDeskApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
      keepUnusedDataFor: 6000,
      transformResponse: (response: UsersResponse, meta, arg) => {
        const data = response.data.map((u) => ({
          // @ts-expect-error
          name: `${u.firstName} ${u.lastName}`,
          // @ts-expect-error
          department: u.department,
          ...u,
        }));
        return {
          ...response,
          data,
        };
      },
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
