import { createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  isNavigating: boolean;
}

const initialState: LayoutState = {
  isNavigating: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleNavigation(state) {
      state.isNavigating = !state.isNavigating;
    },
  },
});

export const { toggleNavigation } = layoutSlice.actions;

export default layoutSlice.reducer;
