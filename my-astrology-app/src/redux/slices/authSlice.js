// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth", // Redux slice Name
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.data.user; // hold user details
      state.token = action.payload.data.jwtToken; // Store token
      localStorage.setItem("token", action.payload.data.jwtToken);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
