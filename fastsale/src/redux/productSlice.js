import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    findById: (state, action) => {
      return state.data.find((item) => item.id === action.payload);
    },
  },
});

export const { setData } = productSlice.actions;
export default productSlice.reducer;
