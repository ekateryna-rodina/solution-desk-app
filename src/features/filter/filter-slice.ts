import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFilters } from "../../app/solutionDeskApi";
import { FilterRadioType } from "../../constants";
import { IFilterApplied, IFilterOptions } from "../../types/index";

interface FilterState {
  isShown: boolean;
  options: IFilterOptions;
  current: IFilterApplied;
  applied: Array<IFilterApplied>;
}

const initialState: FilterState = {
  isShown: false,
  current: {
    term: "",
    filterType: FilterRadioType.Is,
    option: "city",
  },
  options: {
    gender: [],
    city: [],
    country: [],
    responseRate: [],
    customerService: [],
  },
  applied: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setIsShown(state, action: PayloadAction<boolean>) {
      state.isShown = action.payload;
    },
    setCurrentFilterType(state, action: PayloadAction<FilterRadioType>) {
      state.current.filterType = action.payload;
    },
    setCurrentTerm(state, action: PayloadAction<string>) {
      state.current.term = action.payload;
    },
    applyFilter(state, action: PayloadAction<IFilterApplied>) {
      state.applied.push(action.payload);
    },
  },
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
export const { setIsShown, setCurrentFilterType, setCurrentTerm, applyFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
