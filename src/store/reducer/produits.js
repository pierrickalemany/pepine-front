import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const initialState = {
  produits: [],
  media: [],
  mediaOrder: [],
  productUpdate: null,
  productId: null,
  isProductSended: false,
  isCategorySended: false,
  isModal: false,
  loading: false,
  error: null,
};

//Get all Products
export const fetchProduits = createAsyncThunk("produits/fetch", async () => {
  const response = await axios.get("https://pepine-back.onrender.com/products");
  const data = response.data.data.product;
  return data;
});

//Add a new Product
export const addNewProduct = createAsyncThunk(
  "produits/add",
  async (product) => {
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.post(
        "https://pepine-back.onrender.com/products/",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);
//Update a Product
export const productToUpdate = createAction("product/toUpdate");
export const fetchUpdateProduct = createAsyncThunk(
  "produits/update",
  async ({ id, product }) => {
    const bToken = localStorage.getItem("token") || null;
    console.log(id);
    console.log(product);
    console.log(bToken);
    try {
      const response = await axios.patch(
        `https://pepine-back.onrender.com/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return response.data.data.product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

//Delete an image from a product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const bToken = localStorage.getItem("token") || null;
  try {
    const response = await axios.delete(
      `https://pepine-back.onrender.com/products/media/${id}`,
      {
        headers: {
          Authorization: `Bearer ${bToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//IMAGES

//Upload an Image
export const uploadImage = createAsyncThunk(
  "images/upload",
  async (imageFile) => {
    const bToken = localStorage.getItem("token") || null;
    console.log(imageFile);
    const formData = new FormData();
    formData.append("images", imageFile);

    try {
      const response = await axios.post(
        "https://pepine-back.onrender.com/products/media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

//Delete an Image
export const deleteImage = createAsyncThunk(
  "images/delete",
  async (imageId) => {
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.delete(
        `https://pepine-back.onrender.com/products/media/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return imageId;
    } catch (error) {
      console.log("Error deleteImage");
    }
  },
);
//Update images from localStorage
export const mediaUpdate = createAction("media/update");
//Delete all images from media array
export const emptyMedia = createAction("media/delete");
//MEDIA

//Order of medias
export const mediaOrderFetch = createAsyncThunk(
  "media/orderFetch",
  async (order) => {
    console.log(order);
    const bToken = localStorage.getItem("token") || null;
    try {
      const response = await axios.post(
        "https://pepine-back.onrender.com/products/media/order",
        order,
        {
          headers: {
            Authorization: `Bearer ${bToken}`,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);

export const mediaOrder = createAction("media/order");

//CATEGORY

//Add a category into the product
export const productCategory = createAsyncThunk(
  "produits/category",
  async (category) => {
    const bToken = localStorage.getItem("token") || null;
    console.log(category);
    try {
      const response = await axios.post(
        "https://pepine-back.onrender.com/products/category",
        category,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      return response.data.data.product;
    } catch (error) {
      console.log("error adding productCategory");
    }
  },
);

export const updateProductCategory = createAsyncThunk(
  "update/category",
  async (category) => {
    const bToken = localStorage.getItem("token") || null;
    const { product_id } = category;
    console.log(product_id);
    console.log(category);
    try {
      const response = await axios.patch(
        `https://pepine-back.onrender.com/products/${product_id}/categories`,
        category,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bToken}`,
          },
        },
      );
      console.log(response);
      return response.data.data.product;
    } catch (error) {
      throw error;
    }
  },
);

//Modal
export const activeModal = createAction("active/modal");

const produitsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProduits.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(fetchProduits.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.produits = action.payload;
    })
    .addCase(fetchProduits.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(addNewProduct.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.productId = action.payload.p[0].id;
      state.produits.push(action.payload);
      state.isProductSended = true;
    })
    .addCase(addNewProduct.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.error = action.payload;
    })
    .addCase(fetchUpdateProduct.pending, (state, action) => {
      state.loading = true;
      state.isProductSended = false;
    })
    .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.fulfilled = true;
      state.isProductSended = true;
    })
    .addCase(fetchUpdateProduct.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.isProductSended = false;
    })
    .addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(productToUpdate, (state, action) => {
      console.log(action.payload);
      state.productUpdate = action.payload;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.fulfilled = true;
      const idToDelete = action.payload;
      state.produits = state.produits.filter(
        (product) => product.id !== idToDelete,
      );
    })
    .addCase(uploadImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(uploadImage.fulfilled, (state, action) => {
      state.loading = false;
      state.media.push(action.payload.data.m[0]);
    })
    .addCase(uploadImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(mediaUpdate, (state, action) => {
      const imageExists = state.media.some(
        (item) => item.id === action.payload.id,
      );

      if (!imageExists) {
        state.media.push(action.payload);
      }
    })
    .addCase(emptyMedia, (state, action) => {
      state.media = [];
    })
    .addCase(deleteImage.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteImage.fulfilled, (state, action) => {
      state.loading = false;
      state.fulfilled = true;
      const idToDelete = action.payload;
      state.media = state.media.filter((image) => image.id !== idToDelete);
    })
    .addCase(deleteImage.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.error = action.payload;
    })
    .addCase(mediaOrderFetch.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(mediaOrderFetch.fulfilled, (state, action) => {
      state.isProductSended = false;
      state.isCategorySended = false;
      state.media = [];
      state.mediaOrder = [];
      state.productId = null;
      state.isModal = true;
    })
    .addCase(mediaOrder, (state, action) => {
      state.mediaOrder.push(action.payload);
    })
    .addCase(activeModal, (state, action) => {
      state.isModal = action.payload;
    })
    .addCase(productCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(productCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.isCategorySended = true;
    })
    .addCase(productCategory.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.error = action.error.message;
    });
});

export default produitsReducer;
