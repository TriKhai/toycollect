import { localStore } from "@/plugins/localStore";
import { MyOrder, Order, orderApi, OrderProduct } from "@/services/orderApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk<
  Order | boolean,
  { products: OrderProduct[]; purchaseMethod: string }
>(
  "orderReducer/createOrder",
  async ({ products, purchaseMethod }, { rejectWithValue }) => {
    if (!localStore.get("usr")) return false; // Return boolean explicitly.

    const form: Order = {
      products,
      status: "Pending",
      username: localStore.get("usr") || "",
      purchaseMethod,
    };

    console.log(form);

    try {
      const response = await orderApi.createOrder(form);
      return response; // Ensure a valid Order is returned here.
    } catch (error) {
      return rejectWithValue(error); // Use rejectWithValue for errors.
    }
  }
);

export const getByUsername = createAsyncThunk<MyOrder[], void>(
  "orderReducer/getByUsername",
  async (_, { rejectWithValue }) => {
    try {
      const username: string | null = localStore.get("usr");

      if (!username) {
        return rejectWithValue("Username not found");
      }

      const response = await orderApi.getByUsername(username);
      return response; // Ensure this matches Order[]
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const getOrders = createAsyncThunk<MyOrder[], void>(
  "storeAdminReducer/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const username: string | null = localStore.get("usr");

      if (!username) {
        return rejectWithValue("Username not found");
      }

      const response = await orderApi.getOrders();
      return response; // Ensure this matches Order[]
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const approveOrder = createAsyncThunk<boolean, number>(
  "storeAdminReducer/approveOrder",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await orderApi.approveOrder(id);
      return response; // Giả sử API trả về true/false
    } catch (error) {
      console.error("Approval error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const fetchTopSeller = createAsyncThunk(
  "storeAdminReducer/fetchTopSeller",
  async () => {
    const response = await orderApi.fetchTopSeller();
    return response;
  }
);
