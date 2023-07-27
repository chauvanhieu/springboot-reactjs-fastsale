import AxiosService from "./axiosService";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";
import { setData as setDataProduct } from "../redux/productSlice";
import { setData as setDataCategory } from "../redux/categorySlice";
import { setData as setDataUser } from "../redux/userSlice";
import categoryService from "./categoryService";
import productService from "./productService";
import userService from "./userService";

const loginService = {
  login: async (email, password) => {
    try {
      const loginData = { email, password };
      const res = await AxiosService.post("/login", loginData);
      return res;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  rememberUserLoad: async (navigate, dispatch) => {
    try {
      if (localStorage.getItem("accessToken")) {
        const res = await axios.post(
          process.env.REACT_APP_API_URL + "/login/remember",
          { token: localStorage.getItem("accessToken") }
        );

        const categoryRes = await categoryService.findAll({
          shopId: res.data.user.shopId,
        });

        const productRes = await productService.findByShopId(
          res.data.user.shopId
        );

        const userRes = await userService.findAll({
          shopId: res.data.user.shopId,
        });

        dispatch(setDataCategory(categoryRes.data?.data));
        dispatch(setDataProduct(productRes.data?.data));
        dispatch(setDataUser(userRes.data?.data));
        dispatch(loginSuccess(res.data));

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));

        navigate("/app");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      navigate("/home");
    }
  },
};

export default loginService;
