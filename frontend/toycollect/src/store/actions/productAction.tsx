import { productApi, ProductFormData } from "@/services/productApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetailProduct = createAsyncThunk(
  "productReducer/fetchDetailProduct",
  async (id: number) => {
    const response = await productApi.getById(id);
    return response;
  }
);

// Admin
export const fetchAllStore = createAsyncThunk(
  "productReducer/fetchAllStore",
  async () => {
    const response = await productApi.getAllStore();
    return response;
  }
);

export const fetchLastestProducts = createAsyncThunk(
  "productReducer/fetchLastestProducts",
  async () => {
    const response = await productApi.getLastest();
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "productReducer/addProduct",
  async (form: ProductFormData) => {
    const response = await productApi.addProduct(form);
    return response;
  }
);

export const editProduct = createAsyncThunk<
  boolean, // Return type (assuming the API returns a success flag)
  { id: number; form: ProductFormData }, // Payload type (combined into one object)
  { rejectValue: string } // Error handling type
>("productReducer/editProduct", async ({ id, form }, { rejectWithValue }) => {
  try {
    const response = await productApi.updateProduct(id, form);
    return response; // Assuming response is a boolean (adjust if necessary)
  } catch (error) {
    return rejectWithValue("Failed to update product");
  }
});

export const deleteProduct = createAsyncThunk(
  "productReducer/deleteProduct",
  async (id: number) => {
    const response = await productApi.deleteProduct(id);
    return response;
  }
);
