import { Promotion } from "@/services/promotionApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addVoucher,
  deleteVoucher,
  editVoucher,
  fetchPromotions,
} from "../actions/promotionAction";
import { toast } from "sonner";

export type PromotionState = {
  promotions: Promotion[];
  promotion: Promotion | null;
};

const initialState: PromotionState = {
  promotions: [],
  promotion: null,
};

const promotionReducer = createSlice({
  name: "promotionReducer",
  initialState,
  reducers: {
    setVoucher(state, action: PayloadAction<Promotion>) {
      state.promotion = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchPromotions.fulfilled,
      (state: PromotionState, action) => {
        state.promotions = action.payload;
      }
    );
    builder.addCase(addVoucher.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Add Voucher", {
          description: "Added product Voucher successfully",
        });
      }
    });

    builder.addCase(editVoucher.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Edit Voucher", {
          description: "Edited product Voucher successfully",
        });
      }
    });

    builder.addCase(deleteVoucher.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Delete Voucher", {
          description: "Deleted product Voucher successfully",
        });
      }
    });
  },
});

export const { setVoucher } = promotionReducer.actions;

export default promotionReducer.reducer;
