import AxiosService from "./axiosService";

const orderImportService = {
  // url: http://localhost:8080/api/import
  findAll: async ({
    page = 1,
    limit = 999999,
    orderBy = "desc",
    sortBy = "id",
    minPrice,
    maxPrice,
    shopId = 0,
    startDate,
    endDate,
  }) => {
    try {
      const res = await AxiosService.get("/api/import", {
        params: {
          page,
          limit,
          order_by: orderBy,
          sort_by: sortBy,
          min_price: minPrice,
          max_price: maxPrice,
          shop_id: shopId,
          start_date: startDate,
          end_date: endDate,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching import orders:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findById: async (id) => {
    try {
      const res = await AxiosService.get(`/api/import/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching import order by id:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  create: async (order) => {
    try {
      const res = await AxiosService.post("/api/import", order);
      return res.data;
    } catch (error) {
      console.error("Error creating import order:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  update: async (id, order) => {
    try {
      const res = await AxiosService.put(`/api/import/${id}`, order);
      return res.data;
    } catch (error) {
      console.error("Error updating import order:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default orderImportService;
