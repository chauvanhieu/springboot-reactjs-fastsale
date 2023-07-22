import { loginSuccess, logout } from "./authSlice";
import { setProducts } from "./productSlice";
import loginService from "../service/loginService";
import productService from "./../service/productService";

export const loginUser = async (user, dispatch, navigate) => {
  try {
    const res = await loginService.login(user.email, user.password);

    dispatch(loginSuccess(res.data));

    initProducts(res.data.user.shopId, dispatch);

    localStorage.setItem("accessToken", res.data.accessToken);

    navigate("/");
  } catch (error) {
    navigate("/login");
    console.log("login failed!");
  }
};

export const handleLogout = async (dispatch) => {
  try {
    dispatch(logout());
  } catch (error) {
    console.log("login failed!");
  }
};

export const initProducts = async (shopid, dispatch) => {
  try {
    const productRes = await productService.findByShopId(shopid);
    dispatch(setProducts(productRes.data.data));
  } catch (error) {
    console.log("failed!");
  }
};
