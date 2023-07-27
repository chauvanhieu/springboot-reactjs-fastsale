import AxiosService from "./axiosService";

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
};

export default loginService;
