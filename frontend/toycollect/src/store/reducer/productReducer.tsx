import {
  Product,
  productApi,
  ProductDetail,
  ProductPage,
} from "@/services/productApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import {
  addProduct,
  deleteProduct,
  fetchDetailProduct,
  fetchLastestProducts,
} from "../actions/productAction";
import { toast } from "sonner";

export type ProductState = {
  productPage: ProductPage;
  productDetail: ProductDetail | null;
  lastestProducts: Product[];
};

const initialState: ProductState = {
  productPage: {
    products: [],
    totalPages: 0,
    totalElements: 0,
    size: 8,
    number: 0, // Current page (zero-based)
  },
  productDetail: null,
  lastestProducts: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProductPageAction: (
      state: ProductState,
      action: PayloadAction<ProductPage>
    ) => {
      state.productPage = action.payload;
    },
  },
  extraReducers(builder) {
    // pending: Đang xử lí
    // fulfilled : Đã xử lí
    // rejected : Thất bại
    builder.addCase(fetchDetailProduct.pending, (state, action) => {
      // bật loading
    });

    builder.addCase(
      fetchDetailProduct.fulfilled,
      (state: ProductState, action: PayloadAction<ProductDetail>) => {
        state.productDetail = action.payload;
      }
    );

    builder.addCase(fetchDetailProduct.rejected, (state, action) => {
      // tắt loading
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Add Product", {
          description: "Added product successfully",
        });
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Delete Product", {
          description: "Deleted product successfully",
        });
      }
    });

    builder.addCase(fetchLastestProducts.fulfilled, (state, action) => {
      state.lastestProducts = action.payload;
      // console.log("Payload:", action.payload);
    });
  },
});

export const { setProductPageAction } = productReducer.actions;

export default productReducer.reducer;

// ------------ action api
// Lấy danh sách sản phẩm từ API và cập nhật Redux
export const fetchProducts =
  (page: number, size: number) => async (dispatch: AppDispatch) => {
    try {
      const response: ProductPage = await productApi.getAll(page, size); // Gọi hàm từ service
      dispatch(setProductPageAction(response)); // Dispatch action cập nhật Redux
    } catch (error) {
      console.error("Error in getProductListApi:", error);
    }
  };
