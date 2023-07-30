import AxiosService from "./axiosService";

const orderService = {
  findAll: async ({
    page,
    limit,
    order_by,
    sort_by,
    min_price,
    max_price,
    shop_id,
    start_date,
    end_date,
  }) => {
    const params = {
      page: page || 1,
      limit: limit || 999999,
      order_by: order_by || "desc",
      sort_by: sort_by || "price",
      min_price: min_price || null,
      max_price: max_price || null,
      shop_id: shop_id || 0,
      start_date,
      end_date,
    };
    try {
      const res = await AxiosService.get("/api/orders", params);
      return res;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  findById: async (id) => {
    try {
      const res = await AxiosService.get(`/api/orders/${id}`);
      return res;
    } catch (error) {
      console.error("Error fetching order by id:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  create: async (order) => {
    try {
      const res = await AxiosService.post("/api/orders", order);
      return res;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },

  update: async (id, order) => {
    try {
      const res = await AxiosService.put(`/api/orders/${id}`, order);
      return res;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
    }
  },
};

export default orderService;

// // Gọi phương thức findAll để lấy danh sách đơn hàng
// const orders = await orderService.findAll({
//   page: 1,
//   limit: 10,
//   sortBy: "createdAt",
//   orderBy: "desc",
// });

// // Gọi phương thức findById để lấy thông tin chi tiết của đơn hàng có id = 1
// const orderId = 1;
// const orderDetails = await orderService.findById(orderId);

// // Gọi phương thức create để tạo đơn hàng mới
// const newOrder = {
//   // Thông tin đơn hàng...
// };
// const createdOrder = await orderService.create(newOrder);

// // Gọi phương thức update để cập nhật thông tin của đơn hàng có id = 1
// const updatedOrder = {
//   // Thông tin cập nhật...
// };
// const updatedOrderResult = await orderService.update(orderId, updatedOrder);
