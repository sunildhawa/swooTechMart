"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ShoppingCart, Package } from "lucide-react"; // Naye icons add kiye

import { axiosAPIinstance } from "@/utils/webApiHepler";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartCount(0);
        setTotalPrice(0);
        return;
      }

      const res = await axiosAPIinstance.get(`cart/my-cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status || res.data.success) {
        const allItems = res.data.data || [];
        const selectedIdsRaw = localStorage.getItem("selectedCartIds");
        const selectedIds = selectedIdsRaw ? selectedIdsRaw.split(",") : allItems.map(p => p._id);

        const selectedItems = allItems.filter(item => selectedIds.includes(item._id));
        setCartCount(selectedItems.length);

        const total = selectedItems.reduce((acc, item) => {
          const price = item.productId?.final_price || item.productId?.price || 0;
          const quantity = item.qty || 0;
          return acc + (price * quantity);
        }, 0);

        setTotalPrice(total);
      }
    } catch (error) {
      console.error("Header Fetch Error:", error.message);
    }
  }, []);

  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        try { setUser(JSON.parse(storedUser)); } catch (e) { setUser(null); }
      }
    };

    loadData();
    fetchCartData();

    window.addEventListener("cartUpdated", fetchCartData);
    window.addEventListener("storage", (e) => {
      if (e.key === "selectedCartIds" || e.key === "user") {
        fetchCartData();
        loadData();
      }
    });

    return () => {
      window.removeEventListener("cartUpdated", fetchCartData);
    };
  }, [fetchCartData]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded italic font-bold">Hotline 24/7</span>
            <span className="font-bold text-black text-[12px] tracking-widest">(025) 3886 25 16</span>
          </div>
          <div className="flex gap-6 items-center uppercase tracking-[2px] font-bold opacity-60">
            <span>Sell on Swoo</span>
            <Link href="/order-tracking" className="hover:text-teal-600 transition-colors">Order Tracking</Link>
          </div>
        </div>
      </div>

      <header className="bg-white py-5 px-6 shadow-sm sticky top-0 z-50 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-10">
            <Link href="/" className="group">
               <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-100 group-hover:rotate-12 transition-transform">⚡</div>
                  <div>
                    <h1 className="font-black text-2xl leading-none tracking-tighter text-gray-900">SWOO</h1>
                    <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest">Tech Mart</p>
                  </div>
               </div>
            </Link>

           <nav className="hidden lg:flex gap-8 font-black text-[11px] uppercase tracking-widest text-gray-400">
  <Link 
    href="/" 
    // Exact match ke liye logic thoda saaf kiya
    className={`${pathname === "/" ? "text-teal-600 border-b-2 border-teal-500" : "hover:text-gray-900"} pb-1`}
  >
    Home
  </Link>
  
  <Link 
    href="/products" 
    className={`${pathname.startsWith("/products") ? "text-teal-600 border-b-2 border-teal-500" : "hover:text-gray-900"} pb-1`}
  >
    Collections
  </Link>

  {user && (
    <Link 
      href="/viewOrder" 
      className={`${pathname === "/viewOrder" ? "text-teal-600 border-b-2 border-teal-500" : "hover:text-gray-900"} pb-1`}
    >
      My Orders
    </Link>
  )}
</nav>
          </div>

          <div className="flex items-center gap-8">
            {/* Cart Section */}
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
              <Link
                href="/cartPage"
                className="relative bg-white w-12 h-12 rounded-xl flex items-center justify-center text-gray-800 hover:bg-teal-500 hover:text-white transition-all shadow-sm group"
              >
                <ShoppingCart size={22} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white font-black shadow-lg animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="pr-4 leading-none">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mb-1">Selected Items</p>
                <p className="text-[16px] font-black text-teal-600">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* User & Orders Section */}
            {user ? (
              <div className="flex items-center gap-4 border-l pl-2">
                {/* My Orders Quick Link */}
                <Link href="/viewOrder" className="flex flex-col items-center group transition-all">
                   <Package size={20} className="text-gray-400 group-hover:text-teal-600" />
                   <span className="text-[9px] font-black text-gray-400 group-hover:text-teal-600 uppercase tracking-tighter">Orders</span>
                </Link>

                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] text-gray-300 font-black tracking-widest uppercase">Member</p>
                    <p className="text-sm font-black text-gray-900 leading-none">{user.name?.split(' ')[0]}</p>
                  </div>
                  <Link href="/profile">
                    <img 
                      src={user.profilePic ? `http://localhost:5000/uploads/user/${user.profilePic}` : `https://ui-avatars.com/api/?name=${user.name}`}
                      className="w-10 h-10 rounded-full border-2 border-teal-50 shadow-sm hover:border-teal-500 transition-all"
                      alt="user"
                    />
                  </Link>
                </div>
              </div>
            ) : (
               <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-teal-600 transition-colors">Log In</Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}