import AxiosService from "./axiosService";

const productService = {
  findByShopId: async (shopId) => {
    try {
      const response = await AxiosService.get(
        `/api/products?shop_id=${shopId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findAll: async (params) => {
    try {
      const response = await AxiosService.get(`/api/products`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findById: async (productId) => {
    try {
      const response = await AxiosService.get(`/api/products/${productId}`);
      return response;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  create: async (productData) => {
    try {
      const response = await AxiosService.post(`/api/products`, productData);
      return response;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  update: async (productId, productData) => {
    try {
      const response = await AxiosService.put(
        `/api/products/${productId}`,
        productData
      );
      return response;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  delete: async (productId) => {
    try {
      await AxiosService.delete(`/api/products/${productId}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  restoreProduct: async (productId) => {
    try {
      await AxiosService.post(`/api/products/restore/${productId}`);
    } catch (error) {
      console.error("Error restoring product:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default productService;
