import AxiosService from "./axiosService";

const userService = {
  findAll: async ({ keyword, page, limit, orderBy, sortBy, shopId }) => {
    const params = {
      keyword: keyword || "",
      page: page || 1,
      limit: limit || 999999,
      order_by: orderBy || "desc",
      sort_by: sortBy || "id",
      shop_id: shopId || 0,
    };
    try {
      const response = await AxiosService.get(`/api/users`, params);
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findById: async (userId) => {
    try {
      const response = await AxiosService.get(`/api/users/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching user by id:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  create: async (userData) => {
    try {
      const response = await AxiosService.post(`/api/users`, userData);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  update: async (userId, userData) => {
    try {
      const response = await AxiosService.put(`/api/users/${userId}`, userData);
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  delete: async (userId) => {
    try {
      await AxiosService.delete(`/api/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  restore: async (userId) => {
    try {
      await AxiosService.post(`/api/users/restore/${userId}`);
    } catch (error) {
      console.error("Error restoring user:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default userService;
