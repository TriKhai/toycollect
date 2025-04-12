import { userApi } from "@/services/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfileUser = createAsyncThunk(
  "userReducer/fetchProfileUser",
  async () => {
    const response = await userApi.getProfile();
    return response;
  }
);
