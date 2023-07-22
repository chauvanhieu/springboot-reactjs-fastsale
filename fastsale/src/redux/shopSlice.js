import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    currentShop: null,
  },
  reducers: {
    setCurrentShop(state, action) {
      state.currentShop = action.payload;
    },
    removeCurrentShop(state) {
      state.currentShop = null;
    },
  },
});

export const { setCurrentShop, removeCurrentShop } = shopSlice.actions;
export default shopSlice.reducer;
