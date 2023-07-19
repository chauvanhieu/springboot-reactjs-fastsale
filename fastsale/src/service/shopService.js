import AxiosService from "./axiosService";

const shopService = {
  // url: http://localhost:8080/api/api/shops
  findAll: async () => {
    try {
      const data = await AxiosService.get("/api/shops");
      return data;
    } catch (error) {
      console.error("Error fetching all shops:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findById: async (id) => {
    try {
      const data = await AxiosService.get(`/api/shops/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching shop with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  create: async (shop) => {
    try {
      const data = await AxiosService.post("/api/shops", shop);
      return data;
    } catch (error) {
      console.error("Error creating shop:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  update: async (shop) => {
    try {
      const data = await AxiosService.put(`/api/shops/${shop.id}`, shop);
      return data;
    } catch (error) {
      console.error(`Error updating shop with ID ${shop.id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  delete: async (id) => {
    try {
      const data = await AxiosService.delete(`/api/shops/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting shop with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  restore: async (id) => {
    try {
      const data = await AxiosService.put(`/api/shops/${id}/restore`);
      return data;
    } catch (error) {
      console.error(`Error restoring shop with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default shopService;
