import { createSlice } from "@reduxjs/toolkit";
import { getFilters } from "../../app/solutionDeskApi";
import { IFilter } from "../../types/index";

interface FilterState {
  options: IFilter;
}

const initialState: FilterState = {
  options: {
    gender: [],
    city: [],
    country: [],
    responseRate: [],
    customerService: [],
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(getFilters.matchFulfilled, (state, { payload }) => {
      state.options.gender = payload.gender;
      state.options.city = payload.city;
      state.options.country = payload.country;
      state.options.responseRate = payload.responseRate;
      state.options.customerService = payload.customerService;
    });
  },
});

export default filterSlice.reducer;
