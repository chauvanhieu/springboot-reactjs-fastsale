import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./../service/categoryService";

export const getData = createAsyncThunk(
  "category/setData",
  async ({ shopId }, thunkAPI) => {
    try {
      const response = await categoryService.findAll({ shopId });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    error: false,
    loading: false,
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

export const { setData } = CategorySlice.actions;
export default CategorySlice.reducer;
