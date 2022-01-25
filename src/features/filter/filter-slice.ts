import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFilters } from "../../app/solutionDeskApi";
import { FilterRadioType } from "../../constants";
import { IFilter } from "../../types/index";

interface FilterState {
  isShown: boolean;
  options: IFilter;
  current: {
    term: string;
    filterType: FilterRadioType;
  };
}

const initialState: FilterState = {
  isShown: false,
  current: {
    term: "",
    filterType: FilterRadioType.Is,
  },
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
export const { setIsShown, setCurrentFilterType, setCurrentTerm } =
  filterSlice.actions;
export default filterSlice.reducer;
