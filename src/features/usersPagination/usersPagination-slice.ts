import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersPaginationState {
  page: number;
  limit: number;
}

const initialState: UsersPaginationState = {
  page: 1,
  limit: 10,
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
});

export const { setPage } = usersPaginationSlice.actions;

export default usersPaginationSlice.reducer;
