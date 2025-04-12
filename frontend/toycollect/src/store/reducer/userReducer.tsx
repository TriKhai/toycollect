import { UserProfile } from "@/services/userApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileUser } from "../actions/userAction";
import { MyOrder } from "@/services/orderApi";
import { getByUsername } from "../actions/orderAction";

export interface UserState {
  userProfile: UserProfile | null;
  myOrders: MyOrder[];
}

const initialState: UserState = {
  userProfile: null,
  myOrders: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.myOrders = [];
    },
  },
  extraReducers(builder) {
    // pending: Đang xử lí
    // fulfilled : Đã xử lí
    // rejected : Thất bại
    builder.addCase(
      fetchProfileUser.fulfilled,
      (state: UserState, action: PayloadAction<UserProfile>) => {
        // bật loading
        state.userProfile = action.payload;
      }
    );

    builder.addCase(
      getByUsername.fulfilled,
      (state: UserState, action: PayloadAction<MyOrder[]>) => {
        state.myOrders = action.payload;
      }
    );
  },
});

export const { clearOrders } = userReducer.actions;

export default userReducer.reducer;
