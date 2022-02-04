import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../../app/solutionDeskApi";

interface UsersSearchState {
  search: string;
}

const initialState: UsersSearchState = {
  search: "",
};

const usersSearchSlice = createSlice({
  name: "usersSearch",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getAllUsers.matchFulfilled, (state, { payload }) => {
      state.search = payload.search;
    });
  },
});

export const { setSearchQuery } = usersSearchSlice.actions;

export default usersSearchSlice.reducer;
