import axios from "axios";
import { localStore } from "./localStore";
import { navigate } from "@/hooks/useAppNavigate";
export const DOMAIN: string = "http://localhost:8080";
export const ACCESS_TOKEN: string = "token";
export const USER_LOGIN: string = "userLogin";

const axiosClient = axios.create({
  baseURL: DOMAIN, // Base URL chung cho toàn bộ dự án
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // time out call api
});

// Interceptors: Xử lý trước và sau mỗi request
// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStore.get("token");

    if (token) {
      config.headers.token = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi thành công (2xx)
    return response;
  },
  (error) => {
    // Lấy status từ phản hồi lỗi
    const status = error.response?.status;

    // Nếu là lỗi 404 (Not Found)
    if (status === 404) {
      console.log("Resource not found!");
    }

    // Nếu là lỗi 401 (Unauthorized) hoặc 403 (Forbidden)
    if (status === 401 || status === 403) {
      console.log("Unauthorized - Redirecting to login");
      navigate("/login");
    }

    // Trả về lỗi để xử lý tiếp
    return Promise.reject(error);
  }
);

export default axiosClient;
