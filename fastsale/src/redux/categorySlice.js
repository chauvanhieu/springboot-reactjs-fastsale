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

export const add = createAsyncThunk(
  "category/add",
  async ({ category }, thunkAPI) => {
    try {
      const response = await categoryService.create(category);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const remove = createAsyncThunk(
  "category/remove",
  async ({ id }, thunkAPI) => {
    try {
      await categoryService.delete(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restore = createAsyncThunk(
  "category/resotre",
  async ({ id }, thunkAPI) => {
    try {
      await categoryService.restore(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const update = createAsyncThunk(
  "category/update",
  async ({ id, category }, thunkAPI) => {
    try {
      const response = await categoryService.update(Number(id), category);
      return response.data;
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
        let category = state.data.find((item) => item.id === action.payload);
        if (category) {
          category.status = 0;
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
        let category = state.data.find((item) => item.id === action.payload);
        if (category) {
          category.status = 1;
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
        const category = action.payload;
        const index = state.data.findIndex((item) => item.id === category.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...category };
        } else {
          state.data.push(category);
        }
        state.error = false;
      })
      .addCase(update.rejected, (state) => {
        state.loading = true;
        state.error = true;
      });
  },
});

export const { setData } = CategorySlice.actions;
export default CategorySlice.reducer;
