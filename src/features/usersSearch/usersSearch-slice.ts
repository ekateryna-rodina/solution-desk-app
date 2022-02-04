import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    // builder.addMatcher(getAllUsers.matchFulfilled, (state, { payload }) => {
    // });
  },
});

export const { setSearchQuery } = usersSearchSlice.actions;

export default usersSearchSlice.reducer;
