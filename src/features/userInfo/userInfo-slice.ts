import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeWithDiscriminator, User } from "../../types";

interface UserInfoState {
  current: TypeWithDiscriminator<User> | null;
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
    openUserInfo(state, action: PayloadAction<TypeWithDiscriminator<User>>) {
      if (!state.current) state.current = action.payload;
    },
    closeUserInfo(state) {
      state.current = null;
    },
    enableEditMode(state) {
      state.isEditMode = true;
    },
    editUserInfo(
      state,
      action: PayloadAction<{ name: keyof User; value: string | number | Date }>
    ) {
      if (!state.current) return;
      state.current![action.payload.name].value = action.payload.value;
    },
  },
});

export const { openUserInfo, closeUserInfo, enableEditMode, editUserInfo } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
