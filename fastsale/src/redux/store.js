import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import shopSlice from "./shopSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    shop: shopSlice,
  },
});
