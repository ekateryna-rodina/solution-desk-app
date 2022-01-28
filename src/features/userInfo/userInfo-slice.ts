import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  current: {
    id: string;
  } | null;
}

const initialState: UserInfoState = {
  current: null,
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
  },
});

export const { openUserInfo, closeUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
