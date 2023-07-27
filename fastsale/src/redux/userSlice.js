import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./../service/userService";

export const getData = createAsyncThunk(
  "user/setData",
  async ({ shopId }, thunkAPI) => {
    try {
      const response = await userService.findAll({ shopId });
      return response.data.data;
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
      });
  },
});

export const { setData } = userSlice.actions;
export default userSlice.reducer;
