import { typeApi, TypeProductForm } from "@/services/typeApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTypes = createAsyncThunk(
  "typeReducer/fetchTypes",
  async () => {
    const response = await typeApi.getAll();
    return response;
  }
);

export const addType = createAsyncThunk(
  "brandReducer/addType",
  async (form: TypeProductForm) => {
    const response = await typeApi.addType(form);
    return response;
  }
);

export const editType = createAsyncThunk<
  boolean, // Return type (assuming the API returns a success flag)
  { id: number; form: TypeProductForm }, // Payload type (combined into one object)
  { rejectValue: string } // Error handling type
>("productReducer/editType", async ({ id, form }, { rejectWithValue }) => {
  try {
    const response = await typeApi.updateType(id, form);
    return response; // Assuming response is a boolean (adjust if necessary)
  } catch (error) {
    return rejectWithValue("Failed to update product");
  }
});

export const deleteType = createAsyncThunk(
  "productReducer/deleteType",
  async (id: number) => {
    const response = await typeApi.deleteType(id);
    return response;
  }
);
