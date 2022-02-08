import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { IFilterApplied, User } from "../types";

type UsersResponse = {
  appliedFilters: IFilterApplied[];
  data: User[];
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<any, string>({
      query: (id) => `users/${id}`,
    }),
    getAllUsers: builder.query<
      any,
      {
        page: string;
        limit: string;
        filter: string;
        order: string;
        column: string;
        search: string;
      }
    >({
      query: ({ page, limit, filter, order, column, search }) => {
        return `users?page=${page}&limit=${limit}&filter=${filter}&order=${order}&column=${column}&search=${search}`;
      },
      keepUnusedDataFor: 6000,
      // providesTags: (result) =>
      //   result ? result.map(({ id }) => ({ type: "User", id })) : [],
      transformResponse: (response: UsersResponse, meta, arg) => {
        const data = response.data.map((u) => ({
          // @ts-expect-error
          name: `${u.firstName} ${u.lastName}`,
          // @ts-expect-error
          department: u.department,
          ...u,
          employed: u.employed ?? new Date().toUTCString(),
          customerServiceWithDynamic: `${u.customerService}_${u.customerServiceDynamic}`,
          responseRateWithDynamic: `${u.responseRate}_${u.responseRateDynamic}`,
          phone: "+2(800)345 3555",
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
    createUser: builder.mutation<Partial<User>, Partial<User>>({
      query: (body) => {
        return {
          url: "users",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  util: { getRunningOperationPromises },
} = solutionDeskApi;

// export endpoints for use in SSR
export const { getUserById, getAllUsers, getFilters } =
  solutionDeskApi.endpoints;
