import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  current: {
    id: string;
  } | null;
  isEditMode: boolean;
}

const initialState: UserInfoState = {
  current: null,
  isEditMode: false,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    openUserInfo(state, action: PayloadAction<string>) {
      if (!state.current) state.current = { id: action.payload };
    },
    closeUserInfo(state) {
      state.current = null;
    },
    enableEditMode(state) {
      state.isEditMode = true;
    },
  },
});

export const { openUserInfo, closeUserInfo, enableEditMode } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
