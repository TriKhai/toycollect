import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder } from "../actions/orderAction";
import { toast } from "sonner";

const getCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: getCartFromStorage(),
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = initialState.items;
      localStorage.removeItem("cart");
      console.log("clear");
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;

        // Cập nhật localStorage sau khi thay đổi
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.items = [];
        localStorage.removeItem("cart");
        toast.success("Order", {
          description: "You have successfully placed an order.",
        });
      }
    });
  },
});

export const { addToCart, updateQuantity, clearCart, removeFromCart } =
  cartReducer.actions;

export default cartReducer.reducer;
