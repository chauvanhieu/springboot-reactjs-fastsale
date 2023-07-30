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

export const add = createAsyncThunk(
  "product/add",
  async ({ product }, thunkAPI) => {
    try {
      const response = await productService.create(product);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const remove = createAsyncThunk(
  "product/remove",
  async ({ id }, thunkAPI) => {
    try {
      await productService.delete(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restore = createAsyncThunk(
  "product/resotre",
  async ({ id }, thunkAPI) => {
    try {
      await productService.restore(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const update = createAsyncThunk(
  "product/update",
  async ({ id, product }, thunkAPI) => {
    try {
      const response = await productService.update(Number(id), product);
      return response.data;
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
      })
      .addCase(add.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.loading = false;
        const newDataItem = { ...action.payload };
        state.data.push(newDataItem);
        state.error = false;
      })
      .addCase(add.rejected, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(remove.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        let product = state.data.find((item) => item.id === action.payload);
        if (product) {
          product.status = 0;
        }
        state.error = false;
      })
      .addCase(remove.rejected, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(restore.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(restore.fulfilled, (state, action) => {
        state.loading = false;
        let product = state.data.find((item) => item.id === action.payload);
        if (product) {
          product.status = 1;
        }
        state.error = false;
      })
      .addCase(restore.rejected, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;
        const index = state.data.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...product };
        } else {
          state.data.push(product);
        }
        state.error = false;
      })
      .addCase(update.rejected, (state) => {
        state.loading = true;
        state.error = true;
      });
  },
});

export const { setData } = productSlice.actions;
export default productSlice.reducer;
