"use client"; // Isse localStorage error kabhi nahi aayega

import { useEffect, useState, use } from "react"; // 'use' hook params ke liye
import { getByIdOrders } from "@/api/order";
import OrderDetailsPage from "@/components/website/addToCart/VeiwDetails";

export default function Page({ params }) {
    // Next.js 15+ mein params ko unwrapping ki zaroorat hoti hai
    const { order_id } = use(params); 
    console.log(order_id)
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getByIdOrders(order_id);
                
                if (res.success) {
                    setOrderData(res.data);
                } else {
                    setError(res.message || "Order not found");
                }
            } catch (err) {
                setError("Failed to fetch order details");
            } finally {
                setLoading(false);
            }
        };

        if (order_id) {
            fetchData();
        }
    }, [order_id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 font-medium tracking-tight">Loading Details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Ab data client-side se fetch hokar yahan jayega */}
            <OrderDetailsPage data={orderData} />
        </div>
    );
}