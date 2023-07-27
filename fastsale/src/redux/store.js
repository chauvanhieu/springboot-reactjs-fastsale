import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    user: userSlice,
    cart: cartSlice,
  },
});
