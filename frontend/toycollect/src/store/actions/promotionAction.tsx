import { promotionApi, VoucherForm } from "@/services/promotionApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPromotions = createAsyncThunk(
  "promotionReducer/fetchPromotions",
  async () => {
    const response = await promotionApi.getAll();
    return response;
  }
);

export const addVoucher = createAsyncThunk(
  "brandReducer/addVoucher",
  async (form: VoucherForm) => {
    const response = await promotionApi.addVoucher(form);
    return response;
  }
);

export const editVoucher = createAsyncThunk<
  boolean, // Return type (assuming the API returns a success flag)
  { id: number; form: VoucherForm }, // Payload type (combined into one object)
  { rejectValue: string } // Error handling type
>("productReducer/editVoucher", async ({ id, form }, { rejectWithValue }) => {
  try {
    const response = await promotionApi.updateVoucher(id, form);
    return response; // Assuming response is a boolean (adjust if necessary)
  } catch (error) {
    return rejectWithValue("Failed to update product");
  }
});

export const deleteVoucher = createAsyncThunk(
  "productReducer/deleteVoucher",
  async (id: number) => {
    const response = await promotionApi.deleteVoucher(id);
    return response;
  }
);
