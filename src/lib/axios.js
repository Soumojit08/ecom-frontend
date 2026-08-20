import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
