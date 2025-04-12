import { brandApi, BrandForm } from "@/services/brandApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrands = createAsyncThunk(
  "brandReducer/fetchBrands",
  async () => {
    const response = await brandApi.getAll();
    return response;
  }
);

export const addBrand = createAsyncThunk(
  "brandReducer/addBrand",
  async (form: BrandForm) => {
    const response = await brandApi.addBrand(form);
    return response;
  }
);

export const editBrand = createAsyncThunk<
  boolean, // Return type (assuming the API returns a success flag)
  { id: number; form: BrandForm }, // Payload type (combined into one object)
  { rejectValue: string } // Error handling type
>("productReducer/editBrand", async ({ id, form }, { rejectWithValue }) => {
  try {
    const response = await brandApi.updateBrand(id, form);
    return response; // Assuming response is a boolean (adjust if necessary)
  } catch (error) {
    return rejectWithValue("Failed to update product");
  }
});

export const deleteBrand = createAsyncThunk(
  "productReducer/deleteBrand",
  async (id: number) => {
    const response = await brandApi.deleteBrand(id);
    return response;
  }
);
