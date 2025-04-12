import { Type } from "@/services/typeApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addType,
  deleteType,
  editType,
  fetchTypes,
} from "../actions/typeAction";
import { toast } from "sonner";

export type TypeState = {
  types: Type[];
  type: Type | null;
};

const initialState: TypeState = {
  types: [],
  type: null,
};

const typeReducer = createSlice({
  name: "typeReducer",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<Type>) {
      state.type = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTypes.fulfilled, (state: TypeState, action) => {
      state.types = action.payload;
    });

    builder.addCase(addType.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Add Type", {
          description: "Added product type successfully",
        });
      }
    });

    builder.addCase(editType.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Edit Type", {
          description: "Edited product type successfully",
        });
      }
    });

    builder.addCase(deleteType.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success("Delete Type", {
          description: "Deleted product type successfully",
        });
      }
    });
  },
});

export const { setType } = typeReducer.actions;

export default typeReducer.reducer;
