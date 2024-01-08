import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://pepine-back.onrender.com";

// Création d'une action asynchrone pour récupérer la liste des commandes
export const getOrdersList = createAsyncThunk("ordersList", async () => {
  const bToken = localStorage.getItem("token") || null;
  try {
    const response = await axios.get(`${URL}/orders/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bToken}`,
      },
    });
    const data = response.data.data.order;

    return data;
  } catch (error) {
    console.log("Error ordersList");
    throw error;
  }
});

// Création d'une commande par le client
export const createOrderByUser = createAsyncThunk(
  "orders/createOrder",
  async (order) => {
    const bToken = localStorage.getItem("token") || null;

    try {
      const response = await axios.post(`${URL}/orders`, order, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bToken}`,
        },
      });

      return response.data.data.o[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
// rattacher les produits du client à une commande
export const orderHasProducts = createAsyncThunk(
  "orders/productsByOrders",
  async (cart) => {
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.post(`${URL}/orders/details`, cart, {
        headers: {
          Authorization: `Bearer ${bToken}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.log("Error orderHasProducts");
      throw error;
    }
  },
);

// Création d'une action asynchrone pour mettre à jour le statut d'une commande
export const changeStatus = createAsyncThunk(
  "changeStatus",
  async ({ id, status }) => {
    const bToken = localStorage.getItem("token") || null;

    const statusObject = {
      newStatus: status,
    };
    console.log(statusObject);
    try {
      const response = await axios.patch(
        `${URL}/orders/${id}/update-status`,
        statusObject,
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return response.data.newStatus;
    } catch (error) {
      console.log("Error changeStatus");
      throw error;
    }
  },
);

// récupérer les orders d'un user
export const ordersOfOneUser = createAsyncThunk(
  "users/ordersOfOneUser",
  async (id) => {
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.get(
        `https://pepine-back.onrender.com/users/${id}/orders`,
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return response.data.data.user;
    } catch (error) {
      console.log("Error");
      throw error;
    }
  },
);

export const isChanged = createAction("change/quantity");
export const reservationStatus = createAction("reservation/status");

// Initialisation de l'état des commandes
const initialState = {
  orders: [],
  loading: false,
  status: "idle",
  error: null,
  orderId: null,
  userOrders: null,
  isChanged: false,
  isOrderSended: false,
  reservationSuccess: false,
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrdersList.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(getOrdersList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orders = action.payload;
      state.loading = false;
    })
    .addCase(getOrdersList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(createOrderByUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(createOrderByUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orderId = action.payload.id;
      state.isOrderSended = true;
      state.loading = false;
    })
    .addCase(createOrderByUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(orderHasProducts.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(orderHasProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isOrderSended = false;
      state.loading = false;
      state.reservationSuccess = true;
    })
    .addCase(orderHasProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
      state.reservationSuccess = false;
    })
    .addCase(reservationStatus, (state, action) => {
      state.reservationSuccess = false;
    })
    .addCase(changeStatus.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(changeStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
    })
    .addCase(changeStatus.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(ordersOfOneUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(ordersOfOneUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userOrders = action.payload;
      state.loading = false;
    })
    .addCase(ordersOfOneUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(isChanged, (state, action) => {
      state.isChanged = action.payload;
    });
});
export default ordersReducer;
