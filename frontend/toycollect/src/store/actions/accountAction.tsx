import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  accountApi,
  AccountInfor,
  Account,
  FormSignup,
  Acc,
} from "@/services/accountApi";

export const login = createAsyncThunk<AccountInfor, Account>(
  "account/login",
  async (account, thunkAPI) => {
    try {
      const response = await accountApi.login(account);
      // Lưu token và username vào localStorage khi đăng nhập thành công

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signup = createAsyncThunk<boolean, FormSignup>(
  "account/signup",
  async (form, thunkAPI) => {
    try {
      const response = await accountApi.signup(form);
      // Lưu token và username vào localStorage khi đăng nhập thành công

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserRole = createAsyncThunk<
  string, // Dữ liệu trả về (userRole)
  void, // Không nhận tham số
  { rejectValue: string } // Kiểu lỗi trả về
>("account/getRole", async (_, thunkAPI) => {
  try {
    const username = localStorage.getItem("usr");
    if (!username) throw new Error("User not found");

    const role = await accountApi.fetchRole({ username });
    return role; // Trả về userRole
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user role");
  }
});

export const fetchAccounts = createAsyncThunk<Acc[]>(
  "storeAdminReducer/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountApi.fetchAccounts();
      return response; // Ensure this matches Order[]
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateAccountActive = createAsyncThunk(
  "storeAdminReducer/updateAccountActive",
  async (id: number) => {
    const response = await accountApi.updateAccountActive(id);
    return response;
  }
);
