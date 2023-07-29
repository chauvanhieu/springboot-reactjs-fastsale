import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../service/loginService";
import {
  getData as getCategories,
  setData as setCategories,
} from "./categorySlice";
import { getData as getProducts, setData as setProducts } from "./productSlice";
import { getData as getUsers, setData as setUsers } from "./userSlice";
import { clear } from "./cartSlice";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, dispatch, navigate }, thunkAPI) => {
    try {
      const response = await loginService.login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      dispatch(getCategories({ shopId: response.data.shop.id }));
      dispatch(getProducts({ shopId: response.data.shop.id }));
      if (response.data.user.role === "ROLE_ADMIN") {
        dispatch(getUsers({ shopId: response.data.shop.id }));
      }
      navigate("/app");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async ({ dispatch, navigate }, thunkAPI) => {
    try {
      const response = await loginService.refresh();
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      dispatch(getCategories({ shopId: response.data.shop.id }));
      dispatch(getProducts({ shopId: response.data.shop.id }));
      if (response.data.user.role === "ROLE_ADMIN") {
        dispatch(getUsers({ shopId: response.data.shop.id }));
      }
      navigate("/app");
      return response.data;
    } catch (error) {
      navigate("/home");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ dispatch, navigate }, thunkAPI) => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      dispatch(setCategories([]));
      dispatch(setProducts([]));
      dispatch(setUsers([]));
      dispatch(clear());
      navigate("/home");
    } catch (error) {
      navigate("/home");
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
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = false;
      })
      .addCase(refresh.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.error = false;
      });
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
