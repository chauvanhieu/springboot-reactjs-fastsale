import axios from "axios";
class AxiosService {
  constructor() {
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";

    this.httpClient = axios.create({
      baseURL,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    });

    this.httpClient.interceptors.request.use(
      (config) => {
        // Thêm xử lý trước khi gửi yêu cầu (nếu cần)
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      (error) => {
        // Xử lý lỗi khi gửi yêu cầu
        return Promise.reject(error);
      }
    );
  }

  async get(url, params) {
    try {
      const response = await this.httpClient.get(url, { params });
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async post(url, data) {
    try {
      const response = await this.httpClient.post(url, data);
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async put(url, data) {
    try {
      const response = await this.httpClient.put(url, data);
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async delete(url) {
    try {
      const response = await this.httpClient.delete(url);
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  handleRequestError(error) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (error.response) {
      // Có phản hồi từ máy chủ, nhưng không thành công (ví dụ: mã lỗi 4xx hoặc 5xx)
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
      if (error.response.status === 409) {
        alert("Email đã tồn tại");
      }
      if (error.response.status === 403 || error.response.status === 404) {
        alert("Bạn không có quyền truy cập vào trang");
      }
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ máy chủ
      console.error("Request Error:", error.request);
    } else {
      // Xảy ra lỗi khi thiết lập yêu cầu (ví dụ: lỗi mạng)
      console.error("Error:", error.message);
    }
    // throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AxiosService();
