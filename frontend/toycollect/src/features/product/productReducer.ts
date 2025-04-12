import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  image: string;
}

export type ProductState = {
  productList: Product[];
};

const initialState:ProductState = {
  productList: [
    {
      id: 16,
      name: "Lapupu Bunny Figure",
      stock: 50,
      price: 39.99,
      image: "lapupu_bunny.jpg",
    }
  ]
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {},
});

export const {} = productReducer.actions;

export default productReducer.reducer;
