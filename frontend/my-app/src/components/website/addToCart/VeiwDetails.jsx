"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft} from "react-icons/fi";

export default function OrderDetailsPage({ data }) {
    const router = useRouter();
    const order = data;
    const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/product/`;

    if (!order) return <div className="p-20 text-center">No order data found.</div>;

    return (
        <div className="max-w-3xl mx-auto p-5 md:py-12 min-h-screen bg-white font-sans">
            {/* Back Button */}
            <div className="flex items-center justify-between mb-10">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                    <FiArrowLeft size={24} />
                </button>
                <div className="text-right">
                    <h1 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter">Order Summary</h1>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest mt-1 uppercase">Ref: {order.orderId}</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Items Card */}
                <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-6">Your Items</h3>
                    <div className="space-y-4">
                        {order.items?.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 p-2 shrink-0">
                                    <img 
                                        src={`${IMAGE_BASE_URL}${item.productId?.thumbnail}`} 
                                        alt="item" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-800 leading-tight">{item.productId?.name}</p>
                                    <p className="text-[11px] text-[#00a884] font-bold mt-1">Quantity: {item.qty}</p>
                                </div>
                                <div className="text-right font-black text-gray-900">
                                    ₹{item.price * item.qty}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 border border-gray-100 rounded-[40px]">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-4">Shipping Address</p>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed italic">{order.address}</p>
                    </div>
                    <div className="p-8 bg-gray-900 rounded-[40px] text-white flex flex-col justify-between">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Grand Total</p>
                        <div className="flex justify-between items-end">
                            <span className="text-3xl font-black tracking-tighter text-white">₹{order.amount}</span>
                            <span className="text-[10px] font-bold text-teal-400 uppercase italic">Secured Transaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}