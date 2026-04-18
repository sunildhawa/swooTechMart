import { axiosAPIinstance } from "@/utils/apiHealpers"

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/";

export const getOrders = async () => {
    try {
        const token = localStorage.getItem("token"); // Token check karein

        const response = await axios.get(`${API_BASE}/order/my-orders`, {
            headers: {
                Authorization: `Bearer ${token}`, // Token headers mein bhejna zaroori hai
            },
        });

        // Backend se { success: true, data: [...] } milna chahiye
        return response.data; 

    } catch (error) {
        // Detailed logging taaki console mein asli wajah dikhe
        console.error("Fetch Orders Error Detail:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            fullError: error.response?.data
        });

        return { 
            success: false, 
            data: [], 
            message: error.response?.data?.message || "Orders load nahi ho paye"
        };
    }
};
// const isServer = typeof window === 'undefined';
// src/api/order.js

export const getByIdOrders = async (id) => {
    try {
        // Sirf instance use karein, headers ki zaroorat nahi kyunki interceptor handles it
        const res = await axiosAPIinstance.get(`/order/${id}`);
        return res.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Fetch Order Detail Error:", errorMessage);
        return { 
            success: false, 
            message: errorMessage 
        };
    }
};