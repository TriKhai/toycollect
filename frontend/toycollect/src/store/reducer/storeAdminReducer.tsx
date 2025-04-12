import {
  CountData,
  productApi,
  ProductDetail,
  Statistic,
} from "@/services/productApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editProduct, fetchAllStore } from "../actions/productAction";
import { MyOrder, orderApi, TopSeller } from "@/services/orderApi";
import {
  approveOrder,
  fetchTopSeller,
  getOrders,
} from "../actions/orderAction";
import { toast } from "sonner";
import { Acc } from "@/services/accountApi";
import { fetchAccounts, updateAccountActive } from "../actions/accountAction";
import { AppDispatch } from "../store";

export type StoreState = {
  products: ProductDetail[];
  orders: MyOrder[];
  accounts: Acc[];
  product: ProductDetail | null;
  countData: CountData | null;
  statistics: Statistic[];
  topSellers: TopSeller[];
};

const initialState: StoreState = {
  products: [],
  orders: [],
  accounts: [],
  product: null,
  countData: null,
  statistics: [],
  topSellers: [],
};

const storeAdminReducer = createSlice({
  name: "storeAdminReducer",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductDetail>) {
      state.product = action.payload;
    },
    setCountData(state, action: PayloadAction<CountData>) {
      state.countData = action.payload;
    },
    setStatistics(state, action: PayloadAction<Statistic[]>) {
      state.statistics = action.payload;
    },
    setTopSellers(state, action: PayloadAction<TopSeller[]>) {
      state.topSellers = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllStore.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(approveOrder.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Order", {
          description: "Approved order successfully",
        });
      } else {
        toast.error("Order", {
          description: "Failed to approve",
        });
      }
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("EDIT PRODUCT", {
          description: "Product edited successfully",
        });
      } else {
        toast.error("OEDIT PRODUCT", {
          description: "Failed to approve",
        });
      }
    });
    builder.addCase(updateAccountActive.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Status Updated", {
          description: "Account status updated successfully!",
        });
      } else {
        toast.error("Error", {
          description: "Failed to update account status!",
        });
      }
    });

    builder.addCase(fetchTopSeller.fulfilled, (state, action) => {
      if (action.payload) {
        state.topSellers = action.payload;
      }
    });
  },
});

export const { setProduct, setCountData, setStatistics, setTopSellers } =
  storeAdminReducer.actions;

export default storeAdminReducer.reducer;

export const fetchCountData = () => async (dispatch: AppDispatch) => {
  try {
    const response = await productApi.getCount();
    dispatch(setCountData(response));
  } catch (error) {
    console.error("Error in fetch data:", error);
  }
};

export const fetchStatistic = () => async (dispatch: AppDispatch) => {
  try {
    const response = await productApi.getStatistics();
    dispatch(setStatistics(response));
  } catch (error) {
    console.error("Error in fetch data:", error);
  }
};
