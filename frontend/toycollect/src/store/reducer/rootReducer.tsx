import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import accountReducer from "./accountReducer";
import userReducer from "./userReducer";
import storeAdminReducer from "./storeAdminReducer";
import modalReducer from "./modalReducer";
import brandReducer from "./brandReducer";
import typeReducer from "./typeReducer";
import promotionReducer from "./promotionReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({
  accountReducer,
  productReducer,
  userReducer,
  storeAdminReducer,
  modalReducer,
  brandReducer,
  typeReducer,
  promotionReducer,
  cartReducer,
});
