import AxiosService from "./axiosService";

const registerService = {
  async register(newUser) {
    try {
      const res = await AxiosService.post("/register", newUser);
      return res;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default registerService;
