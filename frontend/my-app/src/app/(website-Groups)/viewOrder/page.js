"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/api/order";
import { FiChevronRight, FiClock, FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

export default function ViewMyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Added a fallback for the base URL to prevent undefined string concatenation
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/";
  const IMAGE_BASE_URL = `${API_BASE}uploads/product/`;

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await getOrders();
        // Check if response exists and has data property
        setOrders(response?.data || []);
      } catch (err) {
        console.error("Orders load nahi ho paye", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#00a884] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-400 tracking-wide uppercase">Swoo Tech Mart Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5 md:py-12 min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="flex flex-col mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-1 w-8 bg-[#00a884] rounded-full"></span>
          <span className="text-[10px] font-bold text-[#00a884] uppercase tracking-[3px]">Account</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order History</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track your recent purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border border-gray-100 px-6">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <FiShoppingBag size={30} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">Aapki shopping list khali hai. Kuch kamaal ka dhundhein!</p>
          <Link href="/" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => {
            const firstItem = order.items?.[0]?.productId;
            const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            }) : "N/A";

            return (
              <div 
                key={order._id} 
                className="group relative bg-white border border-gray-100 rounded-[32px] p-6 hover:border-[#00a884]/30 hover:shadow-[0_20px_50px_rgba(0,168,132,0.05)] transition-all duration-500"
              >
                {/* Order Meta */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {order.orderId || order._id?.slice(-8)}</span>
                    <div className="flex items-center gap-2 mt-1 text-[12px] font-semibold text-gray-500">
                      <FiClock size={14} />
                      {orderDate}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter ${
                    order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {order.status || 'Processing'}
                  </div>
                </div>

                {/* Product Preview Section */}
                <div className="flex gap-5 items-center">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-50 flex items-center justify-center">
                    <img 
                        src={firstItem?.thumbnail ? `${IMAGE_BASE_URL}${firstItem.thumbnail}` : "/placeholder.png"} 
                        alt="product" 
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                    />
                    {order.items?.length > 1 && (
                        <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-lg">
                            +{order.items.length - 1} More
                        </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-md font-bold text-gray-900 truncate pr-4">
                      {firstItem?.name || "Premium Item"}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{order.address || "Digital Delivery"}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xl font-black text-gray-900 tracking-tight">
                          ₹{order.amount?.toLocaleString('en-IN') || "0"}
                      </div>
                      <Link 
                          href={`/viewDetails/Edit/${order._id}`}
                          className="flex items-center gap-1 text-[12px] font-bold text-[#00a884] hover:gap-2 transition-all"
                      >
                          View Details <FiChevronRight />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Delivery Badge */}
                <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
                          <FiCheckCircle size={12} />
                      </div>
                      <span className="text-[11px] font-bold text-gray-600">Standard Secured Shipping</span>
                  </div>
                  <span className="text-[11px] font-medium text-gray-300">Swoo Tech Mart Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-20 py-10 flex flex-col items-center">
        <p className="text-[9px] font-bold text-gray-300 tracking-[5px] uppercase">Secured by Swoo</p>
      </div>
    </div>
  );
}