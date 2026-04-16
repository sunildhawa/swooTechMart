import axios from "axios";
import toast from "react-hot-toast";

export const notify = (msg, success = true) => {
  const text =
    typeof msg === "string"
      ? msg
      : msg?.message || "Success";

  if (success) {
    toast.success(text);
  } else {
    toast.error(text);
  }
};

function slugCreate(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosAPIinstance = axios.create({
  baseURL,
  timeout: 10000,
});
// Interceptor ke andar aisa karein:
axiosAPIinstance.interceptors.request.use((config) => {
    // Check if we are in the browser
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 🔐 TOKEN AUTO ATTACH

export { notify, slugCreate, axiosAPIinstance };