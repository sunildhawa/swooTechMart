"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useMemo } from 'react';
import { CreditCard, MapPin, ChevronRight, Wallet, Banknote, Loader2, Navigation, CheckCircle2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { axiosAPIinstance } from "@/utils/webApiHepler";
import { notify } from "@/utils/apiHealpers";
import Script from "next/script";

export default function CheckoutPage() {
    const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [isProcessing, setIsProcessing] = useState(false);

    const [address, setAddress] = useState("");
    const [locLoading, setLocLoading] = useState(false);

   const selectedIds = useMemo(() => {
    if (!searchParams) return [];
    const items = searchParams.get('items');
    return items ? items.split(',') : [];
}, [searchParams]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        fetchCheckoutData();
    }, []);

    const fetchCheckoutData = async () => {
        try {
            setLoading(true);
            const res = await axiosAPIinstance.get("cart/my-cart");
            const allItems = res?.data?.data || [];

            if (selectedIds.length > 0) {
                setCartItems(allItems.filter(item => selectedIds.includes(item._id)));
            } else {
                setCartItems(allItems);
            }
        } catch (error) {
            notify("Error fetching cart data", false);
        } finally {
            setLoading(false);
        }
    };

    const detectLocation = () => {
        if (!navigator.geolocation) return alert("Geolocation not supported");
        setLocLoading(true);
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
                const data = await res.json();
                setAddress(data.display_name || "");
            } catch (err) {
                alert("Could not fetch address");
            } finally { setLocLoading(false); }
        }, () => setLocLoading(false));
    };

    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.productId?.final_price * item.qty), 0);
        return { subtotal, total: subtotal };
    }, [cartItems]);

    // --- UPDATED PATHS TO MATCH SERVER.JS ---
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
   const handlePlaceOrder = async () => {

    if (!address) return notify("Please provide a delivery address", false);
    setIsProcessing(true);

    try {

        if (paymentMethod === "cod") {

            const res = await axiosAPIinstance.post("order/verify", {
                paymentMethod: "COD",
                cartItems,
                address,
                amount: totals.total
            });

            if (res.data.success) {
                notify("Order Placed Successfully! 🎉", true);
                router.push("/order-success");
            }

        } else {

            const razorpayLoaded = await loadRazorpayScript();

            if (!razorpayLoaded) {
                notify("Razorpay SDK failed to load", false);
                return;
            }

            const { data } = await axiosAPIinstance.post("order/create", {
    amount: Number(totals.total) || 0
});

const options = {
    key: "rzp_test_Sdet9gXix9q6kO",
    amount: data?.order?.amount,
    currency: "INR",
    name: "Swoo Tech Mart",
    description: "Order Payment",
    order_id: data?.order?.id,

    handler: async function (response) {
        const verifyRes = await axiosAPIinstance.post("order/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentMethod: "Online",
            cartItems,
            address,
            amount: totals.total
        });

        if (verifyRes.data.success) {
            notify("Payment Successful 🎉", true);
            router.push("/order-success");
        } else {
            notify("Payment verification failed", false);
        }
    }
};

const rzp = new window.Razorpay(options);
rzp.open();

}
    } catch (error) {
        console.error(error);
        notify("Order failed. Please check backend connection.", false);
    } finally {
        setIsProcessing(false);
    }
};

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#00A896]" size={40} /></div>;

    return (
        <div className="w-full bg-[#F3F6F6] min-h-screen font-sans pb-20">

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div className="max-w-[1200px] mx-auto px-6 py-6 text-[13px] text-gray-400 flex gap-2 items-center font-medium">
                <span>Home</span> <ChevronRight size={14} />
                <span>Cart</span> <ChevronRight size={14} />
                <span className="text-black font-bold uppercase tracking-wider">Checkout</span>
            </div>

            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="w-full lg:w-2/3 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-gray-800 flex items-center gap-3"><MapPin className="text-[#00A896]" /> Delivery</h2>
                                <button onClick={detectLocation} className="text-[10px] font-black text-[#00A896] bg-[#00A896]/10 px-4 py-2 rounded-full uppercase flex items-center gap-2 hover:bg-[#00A896] hover:text-white transition-all">
                                    {locLoading ? <Loader2 size={12} className="animate-spin" /> : <Navigation size={12} />} Detect Location
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase">Name</label>
                                        <input disabled defaultValue={user?.name} className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase">Email</label>
                                        <input disabled defaultValue={user?.email} className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Full Address</label>
                                    <div className="relative">
                                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="3" className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none outline-none resize-none" placeholder="House no, Area, Landmark, Pincode..." />
                                        {locLoading && <div className="absolute inset-0 bg-gray-50/60 rounded-2xl flex items-center justify-center text-xs font-bold text-gray-400">Detecting...</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h2 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3"><CreditCard className="text-[#00A896]" /> Payment Method</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div onClick={() => setPaymentMethod("cod")} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-[#00A896] bg-[#00A896]/5' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                                    <div className={`p-3 rounded-xl ${paymentMethod === 'cod' ? 'bg-[#00A896] text-white' : 'bg-gray-200 text-gray-400'}`}><Banknote size={20} /></div>
                                    <p className="font-bold text-gray-800 text-sm">Cash On Delivery</p>
                                    {paymentMethod === 'cod' && <CheckCircle2 className="ml-auto text-[#00A896]" size={18} />}
                                </div>
                                <div onClick={() => setPaymentMethod("online")} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'online' ? 'border-[#00A896] bg-[#00A896]/5' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                                    <div className={`p-3 rounded-xl ${paymentMethod === 'online' ? 'bg-[#00A896] text-white' : 'bg-gray-200 text-gray-400'}`}><Wallet size={20} /></div>
                                    <p className="font-bold text-gray-800 text-sm">Online Payment</p>
                                    {paymentMethod === 'online' && <CheckCircle2 className="ml-auto text-[#00A896]" size={18} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 sticky top-10">
                            <h2 className="text-xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Summary</h2>
                            <div className="space-y-6 mb-8 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl p-1 border overflow-hidden">
                                                <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/${item.productId?.thumbnail}`} className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="max-w-[120px]"><p className="text-[11px] font-bold text-gray-800 truncate">{item.productId?.name}</p><p className="text-[10px] font-black text-[#00A896]">Qty: {item.qty}</p></div>
                                        </div>
                                        <span className="font-black text-gray-800 text-xs">₹{(item.productId?.final_price * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 pt-6 border-t border-dashed">
                                <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-widest"><span>Subtotal</span><span className="text-gray-800">₹{totals.subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between text-xs text-[#00A896] font-black uppercase tracking-widest"><span>Shipping</span><span>FREE</span></div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <span className="font-black text-gray-800 text-sm uppercase">Grand Total</span>
                                    <span className="text-3xl font-black text-[#00A896]">₹{totals.total.toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                disabled={isProcessing || cartItems.length === 0}
                                onClick={handlePlaceOrder}
                                className="w-full bg-gray-900 text-white font-black py-5 rounded-[1.5rem] mt-8 hover:bg-[#00A896] transition-all uppercase tracking-widest text-[11px] disabled:opacity-50 shadow-lg shadow-gray-200"
                            >
                                {isProcessing ? "Processing..." : "Place Order Now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}