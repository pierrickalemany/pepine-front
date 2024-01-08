import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = "https://pepine-back.onrender.com/users/login";
const ORDER_URL = "https://pepine-back.onrender.com/orders";
const DELETE_ACCOUNT_URL = "https://pepine-back.onrender.com/users";
const URL = "https://pepine-back.onrender.com";

// Asynchronous action for user authentication
export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials);
    return response.data.data.token;
  } catch (error) {
    throw error;
  }
});

// Asynchronous action to get user orders
export const getUserOrders = createAsyncThunk(
  "user/getUserOrders",
  async (id) => {
    try {
      const response = await axios.get(`${ORDER_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Asynchronous action to get user details by name
export const getUserByNames = createAsyncThunk(
  "user/getUserByNames",
  async (id) => {
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.get(`${URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${bToken}`,
        },
      });
      return response.data.data.user;
    } catch (error) {
      throw error;
    }
  },
);

// Asynchronous action to delete user account
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (id) => {
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.delete(`${DELETE_ACCOUNT_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${bToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Simple actions
export const logoutUser = createAction("user/logout");

const initialState = {
  token: null,
  logged: false,
  error: null,
  orders: [],
  user: null,
  loading: false,
  status: "",
  isDeleted: false,
};

//Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.logged = true;
      state.token = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
      state.logged = false;
    })
    .addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(getUserByNames.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(deleteAccount.fulfilled, (state) => {
      state.token = null;
      state.logged = false;
      state.error = null;
      state.orders = [];
      state.user = null;
      state.isDeleted = true;
    })
    .addCase(logoutUser, (state) => {
      state.token = null;
      state.logged = false;
      state.error = null;
      state.orders = [];
      state.user = null;
    });
});
export default userReducer;
