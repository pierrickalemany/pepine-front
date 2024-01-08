import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  categoryId: null,
  status: "idle",
  error: null,
  loading: false,
  fulfilled: false,
  rejected: false,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await axios.get(
      "https://pepine-back.onrender.com/categories",
    );
    const data = response.data.data.category;
    return data;
  },
);
export const fetchCategoriesById = createAsyncThunk(
  "categories/fetchById",
  async (id) => {
    console.log(id);
    const response = await axios.get(
      `https://pepine-back.onrender.com/categories/${id}/products`,
    );
    const data = response.data.data;
    return data;
  },
);
export const fetchCategoryById = createAction("select/category");

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategoryById, (state, action) => {
      state.categoryId = action.payload;
    })
    .addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.categories = action.payload;
    })
    .addCase(fetchCategoriesById.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(fetchCategoriesById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      console.log(action.payload);
      state.productsByCategory = action.payload;
    });
});

export default categoriesReducer;
