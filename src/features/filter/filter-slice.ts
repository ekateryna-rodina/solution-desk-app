import { createSlice } from "@reduxjs/toolkit";

interface FilterState {}

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
});

export const {} = filterSlice.actions;

export default filterSlice.reducer;
