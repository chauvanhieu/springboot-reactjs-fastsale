import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
    },
    logout: (state) => {
      state.login.currentUser = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
