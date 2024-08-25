import axios from "axios";

const Base_API_URL = `${import.meta.env.VITE_API_URL}`;

export const axiosPrivate = axios.create({
  baseURL: `${Base_API_URL}/api/admin/`,
  headers: { "Content-Type": "application/json" },
});

export default axiosPrivate;
