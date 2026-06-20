import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://what-ai-henna.vercel.app",
    withCredentials: true,
});

export default axiosInstance;