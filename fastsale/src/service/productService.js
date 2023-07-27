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

  findAll: async ({
    keyword,
    page,
    limit,
    category_id,
    order_by,
    sort_by,
    min_price,
    max_price,
    shop_id,
  }) => {
    const params = {
      keyword: keyword || "",
      page: page || 1,
      limit: limit || 999999,
      category_id: category_id || 0,
      order_by: order_by || "desc",
      sort_by: sort_by || "price",
      min_price: min_price || null,
      max_price: max_price || null,
      shop_id: shop_id || 0,
    };
    try {
      const response = await AxiosService.get(`/api/products`, params);
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

  restore: async (productId) => {
    try {
      await AxiosService.post(`/api/products/restore/${productId}`);
    } catch (error) {
      console.error("Error restoring product:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default productService;
