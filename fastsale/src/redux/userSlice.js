import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./../service/userService";

export const getData = createAsyncThunk(
  "user/getData",
  async ({ shopId }, thunkAPI) => {
    try {
      const response = await userService.findAll({ shopId });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const add = createAsyncThunk("user/add", async ({ user }, thunkAPI) => {
  try {
    const response = await userService.create(user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const remove = createAsyncThunk(
  "user/remove",
  async ({ id }, thunkAPI) => {
    try {
      await userService.delete(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restore = createAsyncThunk(
  "user/resotre",
  async ({ id }, thunkAPI) => {
    try {
      await userService.restore(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const update = createAsyncThunk(
  "user/update",
  async ({ id, user }, thunkAPI) => {
    try {
      const response = await userService.update(Number(id), user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
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

export const { setData } = userSlice.actions;
export default userSlice.reducer;
