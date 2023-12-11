import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {},
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = "Login successfully";
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
