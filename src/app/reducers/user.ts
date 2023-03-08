import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
  isLogin: boolean;
  isAnonymous: boolean;
  userInfo: {
    avatar: string;
    nickname: string;
    id: string;
  } | null;
};

const userInitialState: UserStateType = {
  isLogin: false,
  isAnonymous: false,
  userInfo: null,
};

export const user = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
});

export const {} = user.actions;

export default user.reducer;
