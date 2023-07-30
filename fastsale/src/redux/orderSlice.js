import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./../service/orderService";

export const getData = createAsyncThunk(
  "order/getData",
  async ({ shopId }, thunkAPI) => {
    try {
      const res = await orderService.findAll({
        shop_id: shopId,
      });
      return res.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { setData } = orderSlice.actions;
export default orderSlice.reducer;
