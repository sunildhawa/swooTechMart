"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ShoppingCart, Package, Menu, X } from "lucide-react"; // Mobile icons add kiye

import { axiosAPIinstance } from "@/utils/webApiHepler";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const fetchCartData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartCount(0);
        setTotalPrice(0);
        return;
      }

      const res = await axiosAPIinstance.get(`cart`, {
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
      {/* Top Bar - Mobile pe hide kar diya (Optional) */}
      <div className="bg-white border-b py-2 px-4 md:px-6 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded italic font-bold">Hotline 24/7</span>
            <span className="font-bold text-black text-[12px] tracking-widest">(025) 3886 25 16</span>
          </div>
          <div className="flex gap-6 items-center uppercase tracking-[2px] font-bold opacity-60">
            <span className="hidden md:inline">Sell on Swoo</span>
            <Link href="/order-tracking" className="hover:text-teal-600 transition-colors">Order Tracking</Link>
          </div>
        </div>
      </div>

      <header className="bg-white py-4 px-4 md:px-6 shadow-sm sticky top-0 z-50 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:gap-10">
            {/* Hamburger Button */}
            <button
              className="lg:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link href="/" className="group">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-9 h-9 md:w-11 md:h-11 bg-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl shadow-lg shadow-teal-100 group-hover:rotate-12 transition-transform">⚡</div>
                <div>
                  <h1 className="font-black text-xl md:text-2xl leading-none tracking-tighter text-gray-900">SWOO</h1>
                  <p className="text-[8px] md:text-[10px] text-teal-600 font-black uppercase tracking-widest">Tech Mart</p>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-8 font-black text-[11px] uppercase tracking-widest text-gray-400">
              <Link href="/" className={`${pathname === "/" ? "text-teal-600 border-b-2 border-teal-500" : "hover:text-gray-900"} pb-1`}>Home</Link>
              <Link href="/products" className={`${pathname.startsWith("/products") ? "text-teal-600 border-b-2 border-teal-500" : "hover:text-gray-900"} pb-1`}>Collections</Link>
              {user && (
                <Link href="/viewOrder" className={`${pathname === "/viewOrder" ? "text-teal-600 border-b-2 border-teal-500" : "hover:text-gray-900"} pb-1`}>My Orders</Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-8">
            {/* Cart Section */}
            <div className="flex items-center gap-2 md:gap-4 bg-gray-50 p-1 md:p-2 rounded-xl md:rounded-2xl border border-gray-100">
              <Link
                href="/cartPage"
                className="relative bg-white w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-gray-800 hover:bg-teal-500 hover:text-white transition-all shadow-sm"
              >
                <ShoppingCart
                  strokeWidth={2.5}
                  className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] md:text-[10px] w-5 h-5 md:w-6 md:h-6 rounded-lg flex items-center justify-center border-2 border-white font-black shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="pr-2 md:pr-4 leading-none hidden xs:block">
                <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tighter mb-1">Total</p>
                <p className="text-sm md:text-[16px] font-black text-teal-600">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-2 md:gap-4 border-l pl-2 md:pl-4">
                  <Link href="/viewOrder" className="hidden sm:flex flex-col items-center group">
                    <Package size={20} className="text-gray-400 group-hover:text-teal-600" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Orders</span>
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2">
                    <div className="text-right hidden lg:block">
                      <p className="text-[9px] text-gray-300 font-black uppercase">Member</p>
                      <p className="text-sm font-black text-gray-900 leading-none">{user.name?.split(' ')[0]}</p>
                    </div>
                    <img
                      src={user.profilePic ? `${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/user/${user.profilePic}` : `https://ui-avatars.com/api/?name=${user.name}`}
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-teal-50 shadow-sm"
                      alt="user"
                    />
                  </Link>
                </div>
              ) : (
                <Link href="/contact" className="bg-gray-900 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-teal-600 transition-colors">Log In</Link>
              )}
            </div>
          </div>
        </div>

        {/* --- Mobile Sidebar Menu --- */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)}>
          <div
            className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-black text-xl text-teal-600">MENU</h2>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <nav className="flex flex-col gap-6 font-black text-sm uppercase tracking-widest text-gray-500">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className={pathname === "/" ? "text-teal-600" : ""}>Home</Link>
                <Link href="/products" onClick={() => setIsMenuOpen(false)} className={pathname.startsWith("/products") ? "text-teal-600" : ""}>Collections</Link>
                {user && (
                  <>
                    <Link href="/viewOrder" onClick={() => setIsMenuOpen(false)} className={pathname === "/viewOrder" ? "text-teal-600" : ""}>My Orders</Link>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                  </>
                )}
                <div className="pt-6 border-t">
                  <p className="text-[10px] text-gray-400 mb-2">Support</p>
                  <p className="text-lg text-black font-bold">(025) 3886 25 16</p>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}