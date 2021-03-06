import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../../app/solutionDeskApi";
import { Column, Order } from "../../constants";

interface UsersSortingState {
  order: Order;
  column: Column;
}

const initialState: UsersSortingState = {
  order: Order.Ascending,
  column: Column.Name,
};

const usersSortingSlice = createSlice({
  name: "usersSorting",
  initialState,
  reducers: {
    sort(state, action: PayloadAction<{ order: Order; column: Column }>) {
      state.order = action.payload.order;
      state.column = action.payload.column;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getAllUsers.matchFulfilled, (state, { payload }) => {
      state.order = payload.order;
      state.column = payload.column;
    });
  },
});

export const { sort } = usersSortingSlice.actions;

export default usersSortingSlice.reducer;
