import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./../service/productService";

export const getData = createAsyncThunk(
  "product/setData",
  async ({ shopId }, thunkAPI) => {
    try {
      const response = await productService.findAll({ shop_id: shopId });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    error: false,
    loading: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    findById: (state, action) => {
      return state.data.find((item) => item.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getData.rejected, (state) => {
        state.loading = true;
        state.error = true;
      });
  },
});

export const { setData } = productSlice.actions;
export default productSlice.reducer;
