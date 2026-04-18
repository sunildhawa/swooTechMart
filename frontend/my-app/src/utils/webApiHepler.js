import { toast } from 'react-toastify';
import axios from 'axios';

// 🔔 Notification Helper
const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

// 🌐 Base URL Safety
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.endsWith("/")
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : `${process.env.NEXT_PUBLIC_API_BASE_URL}/`;

// 🚀 Axios Instance
const axiosAPIinstance = axios.create({
  baseURL,
  timeout: 10000, // ⏱ request timeout (important)
  headers: {
    "Content-Type": "application/json"
  }
});


// 1️⃣ REQUEST INTERCEPTOR (Token Attach)
axiosAPIinstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));


// 2️⃣ RESPONSE INTERCEPTOR (Auth Expired Handling)
axiosAPIinstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response) {

      // 🔒 Token expired / invalid
      if (error.response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.clear();
          window.dispatchEvent(new Event("storage"));

          notify("Session expired. Please login again.", false);

          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
      }

      // ⚠️ Server error
      if (error.response.status >= 500) {
        notify("Server error. Please try again later.", false);
      }

    } else {
      notify("Network error. Check internet connection.", false);
    }

    return Promise.reject(error);
  }
);


// 💰 Currency Formatter
function formatIndianCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}


// 🔗 Slug Creator
function slugCreate(name) {
  if (!name) return "";
  return name.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export { notify, slugCreate, axiosAPIinstance, formatIndianCurrency };