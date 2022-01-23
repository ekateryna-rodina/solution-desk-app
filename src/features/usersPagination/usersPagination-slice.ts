import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../../app/solutionDeskApi";

interface UsersPaginationState {
  page: number;
  limit: number;
  totalPages: number;
}

const initialState: UsersPaginationState = {
  page: 1,
  limit: 7,
  totalPages: 0,
};

const usersPaginationSlice = createSlice({
  name: "usersPagination",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<{ limit: number; page: number }>) {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getAllUsers.matchFulfilled, (state, { payload }) => {
      state.totalPages = +payload.totalPages;
    });
  },
});

export const { setPage } = usersPaginationSlice.actions;

export default usersPaginationSlice.reducer;
