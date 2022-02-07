import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFilters } from "../../app/solutionDeskApi";
import { TermSearchFilterType } from "../../constants";
import { IFilterApplied, IFilterProperties } from "../../types/index";

interface FilterState {
  isShown: boolean;
  properties: IFilterProperties;
  current: Omit<IFilterApplied, "property"> & {
    property: keyof IFilterProperties | null;
  };
  applied: Array<IFilterApplied>;
}

const initialState: FilterState = {
  isShown: false,
  current: {
    term: "",
    termSearchFilterType: TermSearchFilterType.Is,
    property: null,
  },
  properties: {
    gender: [],
    city: [],
    country: [],
    responseRate: [],
    customerService: [],
    department: [],
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
    setCurrentTermSearchFilterType(
      state,
      action: PayloadAction<TermSearchFilterType>
    ) {
      state.current.termSearchFilterType = action.payload;
    },
    setCurrentTerm(state, action: PayloadAction<string>) {
      state.current.term = action.payload;
    },
    setCurrentFilterProperty(
      state,
      action: PayloadAction<keyof IFilterProperties | null>
    ) {
      state.current.property = action.payload;
    },
    applyFilter(state, action: PayloadAction<IFilterApplied>) {
      state.applied.push(action.payload);
    },
    removeFilter(state, action: PayloadAction<IFilterApplied>) {
      state.applied = state.applied.filter(
        (f) =>
          !(
            f.property == action.payload.property &&
            f.termSearchFilterType == action.payload.termSearchFilterType &&
            f.term == action.payload.term &&
            f.level == action.payload.level
          )
      );
    },
    clearCurrentFilter(state) {
      state.current.term = "";
      state.current.termSearchFilterType = TermSearchFilterType.Is;
      state.current.property = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getFilters.matchFulfilled, (state, { payload }) => {
      state.properties.gender = payload.gender;
      state.properties.city = payload.city;
      state.properties.country = payload.country;
      state.properties.department = payload.department;
      state.properties.responseRate = payload.responseRate;
      state.properties.customerService = payload.customerService;
    });
  },
});
export const {
  setIsShown,
  setCurrentTermSearchFilterType,
  setCurrentTerm,
  applyFilter,
  setCurrentFilterProperty,
  clearCurrentFilter,
  removeFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
