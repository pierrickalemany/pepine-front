import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const REGISTER_URL = "https://pepine-back.onrender.com/users/register";

export const registerUser = createAsyncThunk("user/login", async (formData) => {
  try {
    const response = await axios.post(REGISTER_URL, formData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  error: null,
  loading: false,
  status: "",
};

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.status = "succeeded";
      state.loading = false;
    })
    .addCase(registerUser.rejected, (state) => {
      state.status = "failed";
      state.loading = false;
    });
});
export default registerReducer;
