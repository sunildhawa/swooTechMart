"use client";
import React, { useState } from "react";
import { FiPackage, FiArrowLeft, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { axiosAPIinstance } from "@/utils/webApiHepler";
import { toast } from "react-hot-toast";

// Props receive karna start karein
export default function AdminCartManagementNew({ initialData = [], user = null, isEditPage = false }) {
  const router = useRouter();
  const [items, setItems] = useState(initialData);

  const deleteItem = async (id) => {
    if (!window.confirm("Remove this item?")) return;
    try {
      await axiosAPIinstance.delete(`cart/${id}`);
      setItems(prev => prev.filter(item => item._id !== id));
      toast.success("Item removed");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const totalValue = items.reduce((acc, item) => 
    acc + ((item.productId?.final_price || 0) * item.qty), 0);

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      {/* Back Button agar Edit Page hai */}
      {isEditPage && (
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-6 font-bold transition-all">
          <FiArrowLeft /> Back to Dashboard
        </button>
      )}

      {/* User Header Card */}
      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">{user?.name || "Customer Cart"}</h1>
            <p className="text-slate-400 font-medium">{user?.email}</p>
          </div>
        </div>
        <div className="text-right bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
          <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Total Cart Value</p>
          <p className="text-3xl font-black text-emerald-700">₹{totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Products Grid */}
      <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
        <FiPackage className="text-indigo-600" /> Items List ({items.length})
      </h2>

      <div className="grid gap-4">
        {items.length > 0 ? items.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-md transition-all">
            <div className="w-24 h-24 rounded-2xl bg-slate-50 border p-2 shrink-0 flex items-center justify-center">
              <img 
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/product/${item.productId?.thumbnail}`} 
                className="max-h-full max-w-full object-contain" 
                alt="prod" 
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{item.productId?.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">ID: {item._id}</p>
                </div>
                <button onClick={() => deleteItem(item._id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <FiTrash2 size={20} />
                </button>
              </div>
              <div className="mt-4 flex gap-8 items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-black uppercase">Unit Price</span>
                  <span className="font-bold text-slate-900 text-sm">₹{item.productId?.final_price}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-black uppercase">Qty</span>
                  <span className="font-black text-indigo-600 bg-indigo-50 px-2 rounded-lg text-sm">{item.qty}x</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-black uppercase">Subtotal</span>
                  <span className="font-bold text-slate-900 text-sm">₹{(item.productId?.final_price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="p-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
             <FiShoppingBag className="mx-auto text-slate-200 mb-4" size={50} />
             <p className="text-slate-400 font-bold">This cart is now empty</p>
          </div>
        )}
      </div>
    </div>
  );
}