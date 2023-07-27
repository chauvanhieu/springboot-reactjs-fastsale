import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../service/loginService";
import { getData as getCategories } from "./categorySlice";
import { getData as getProducts } from "./productSlice";
import { getData as getUsers } from "./userSlice";
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, dispatch }, thunkAPI) => {
    try {
      const response = await loginService.login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      // dispatch actions to fetch data for the user and categories & products if not already fetched beforehand
      dispatch(getCategories({ shopId: response.data.shop.id }));
      dispatch(getProducts({ shopId: response.data.shop.id }));
      dispatch(getUsers({ shopId: response.data.shop.id }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    error: false,
    loading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
