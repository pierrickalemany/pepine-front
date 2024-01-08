import { configureStore } from "@reduxjs/toolkit";
import produitsReducer from "./reducer/produits";
import categoriesReducer from "./reducer/categories";
import userReducer from "./reducer/login";
import ordersReducer from "./reducer/orders";
import registerReducer from "./reducer/register";

const store = configureStore({
  reducer: {
    produits: produitsReducer,
    categories: categoriesReducer,
    user: userReducer,
    register: registerReducer,
    orders: ordersReducer,
  },
});

export default store;
