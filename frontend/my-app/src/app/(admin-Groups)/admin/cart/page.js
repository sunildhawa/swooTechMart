"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
    FiShoppingBag, FiSearch, FiEye, FiChevronRight, 
    FiTrendingUp, FiUsers, FiActivity 
} from "react-icons/fi";
import { axiosAPIinstance } from "@/utils/webApiHepler";

export default function AdminCartManagement() {
  const [groupedCarts, setGroupedCarts] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAllCarts = async () => {
    try {
      setLoading(true);
      const res = await axiosAPIinstance.get("/cart");
      const rawData = res.data.data || [];
      
      const groups = rawData.reduce((acc, item) => {
        const userId = item.userId?._id;
        if (!userId) return acc;
        if (!acc[userId]) {
          acc[userId] = {
            userInfo: item.userId,
            items: [],
            totalAmount: 0,
          };
        }
        acc[userId].items.push(item);
        const price = item.productId?.final_price || item.productId?.price || 0;
        acc[userId].totalAmount += (price * item.qty);
        return acc;
      }, {});

      setGroupedCarts(groups);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCarts();
  }, []);

  const userIds = Object.keys(groupedCarts).filter(id => 
    groupedCarts[id].userInfo.name.toLowerCase().includes(search.toLowerCase())
  );

  // Stats calculate karna
  const totalCartValue = Object.values(groupedCarts).reduce((sum, g) => sum + g.totalAmount, 0);
  const totalItems = Object.values(groupedCarts).reduce((sum, g) => sum + g.items.length, 0);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <FiActivity size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Active Carts</p>
                    <h3 className="text-2xl font-bold">{userIds.length}</h3>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <FiTrendingUp size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Potential Revenue</p>
                    <h3 className="text-2xl font-bold">₹{totalCartValue.toLocaleString('en-IN')}</h3>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <FiUsers size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total Items in Carts</p>
                    <h3 className="text-2xl font-bold">{totalItems}</h3>
                </div>
            </div>
        </div>

        {/* --- HEADER & SEARCH --- */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                    <FiShoppingBag className="text-indigo-600" /> Cart Management
                </h2>
                <p className="text-slate-500">Monitor items currently in customer carts</p>
            </div>
            <div className="relative group w-full md:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                    type="text"
                    placeholder="Search by customer name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm"
                />
            </div>
        </div>

        {/* --- MAIN TABLE --- */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider text-center">Items</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider">Estimated Value</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {userIds.length > 0 ? userIds.map((id) => {
                  const group = groupedCarts[id];
                  return (
                    <tr key={id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                            {group.userInfo.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{group.userInfo.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{group.userInfo.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-black">
                          {group.items.length} Products
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-900">₹{group.totalAmount.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] font-bold text-emerald-500 uppercase mt-0.5">Potential Sale</div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <Link 
                          href={`/admin/cart/edit/${id}`}
                          className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 no-underline"
                        >
                          <FiEye /> View Details <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  );
                }) : (
                    <tr>
                        <td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-medium">
                            No active carts found matching your search.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}