import { createSlice } from "@reduxjs/toolkit";

interface AddNewUserState {
  isAddNewShown: boolean;
}

const initialState: AddNewUserState = {
  isAddNewShown: false,
};

const addNewUserSlice = createSlice({
  name: "addNewUser",
  initialState,
  reducers: {
    toggleAddNewUser(state) {
      state.isAddNewShown = !state.isAddNewShown;
    },
  },
});

export const { toggleAddNewUser } = addNewUserSlice.actions;

export default addNewUserSlice.reducer;
