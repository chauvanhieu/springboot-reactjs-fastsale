import AxiosService from "./axiosService";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";

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
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        dispatch(loginSuccess(res.data));
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
