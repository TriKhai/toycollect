import { Brand } from "@/services/brandApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addBrand,
  deleteBrand,
  editBrand,
  fetchBrands,
} from "../actions/brandAction";
import { toast } from "sonner";

export type BrandState = {
  brands: Brand[];
  brand: Brand | null;
};

const initialState: BrandState = {
  brands: [],
  brand: null,
};

const brandReducer = createSlice({
  name: "brandReducer",
  initialState,
  reducers: {
    setBrand(state, action: PayloadAction<Brand>) {
      state.brand = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBrands.fulfilled, (state: BrandState, action) => {
      state.brands = action.payload;
    });

    builder.addCase(addBrand.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Add Brand", {
          description: "Added brand successfully",
        });
      }
    });

    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Delete Brand", {
          description: "Deleted brand successfully",
        });
      }
    });

    builder.addCase(editBrand.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Edit Brand", {
          description: "Edited brand successfully",
        });
      }
    });
  },
});

export const { setBrand } = brandReducer.actions;

export default brandReducer.reducer;
