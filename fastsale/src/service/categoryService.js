import AxiosService from "./axiosService";

const categoryService = {
  findAll: async (keyword, page, limit, orderBy, sortBy, shopId) => {
    try {
      const params = {
        keyword: keyword || "",
        page: page || 1,
        limit: limit || 999999,
        order_by: orderBy || "desc",
        sort_by: sortBy || "id",
        shop_id: shopId || 0,
      };

      const res = await AxiosService.get("/api/categories", params);
      return res;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findById: async (id) => {
    try {
      const res = await AxiosService.get(`/api/categories/${id}`);
      return res;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  create: async (category) => {
    try {
      const res = await AxiosService.post("/api/categories", category);
      return res;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  update: async (id, category) => {
    try {
      const res = await AxiosService.put(`/api/categories/${id}`, category);
      return res;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  delete: async (id) => {
    try {
      const res = await AxiosService.delete(`/api/categories/${id}`);
      return res;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  restore: async (id) => {
    try {
      const res = await AxiosService.post(`/api/categories/restore/${id}`);
      return res;
    } catch (error) {
      console.error(`Error restoring category with ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default categoryService;
