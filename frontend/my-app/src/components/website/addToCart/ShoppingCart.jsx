"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2, CheckCircle2, Circle } from 'lucide-react';
import { axiosAPIinstance } from "@/utils/webApiHepler";
import { notify } from "@/utils/apiHealpers";
import Link from 'next/link';

const ShopCart = () => {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const res = await axiosAPIinstance.get("cart/my-cart");
      
      // FIX: Check your API response. Agar res.data hi array hai toh use res.data
      const data = res?.data?.data || res?.data || []; 
      setProducts(data);
      
      // By default saare items select karne ke liye
      if (Array.isArray(data)) {
        setSelectedIds(data.map(p => p._id));
      }
    } catch (error) {
      console.error("Cart Fetch Error:", error);
      notify("Could not load cart items", false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCartData(); }, []);

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p._id)); 
    }
  };

  const updateQty = async (cartId, newQty) => {
    if (newQty < 1) return;
    
    // Optimistic UI Update
    setProducts(prev => prev.map(p => p._id === cartId ? { ...p, qty: newQty } : p));

    try {
      await axiosAPIinstance.put(`cart/${cartId}`, { qty: newQty });
      window.dispatchEvent(new Event("cartUpdated")); 
    } catch (error) {
      fetchCartData(); // Revert on error
      notify("Failed to update quantity", false);
    }
  };

  const removeItem = async (id) => {
    if(!confirm("Remove this item?")) return;
    try {
      await axiosAPIinstance.delete(`cart/${id}`);
      setProducts(prev => prev.filter(item => item._id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      notify("Item removed", true);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      notify("Failed to remove item", false);
    }
  };

  const totals = useMemo(() => {
    const selectedItems = products.filter(p => selectedIds.includes(p._id));
    const subtotal = selectedItems.reduce((acc, item) => {
      // FIX: Checking for productId safely
      const price = item.productId?.final_price || 0;
      return acc + (price * (item.qty || 1));
    }, 0);
    return { subtotal, total: subtotal, count: selectedItems.length };
  }, [products, selectedIds]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
      <p className="font-bold text-slate-500">Syncing your cart...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfcfd] p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <header>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-2xl">
                  <ShoppingBag className="w-8 h-8 text-teal-600" />
              </div>
              My Cart
            </h1>
          </header>

          {products.length > 0 && (
            <button 
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200"
            >
              {selectedIds.length === products.length ? <CheckCircle2 className="text-teal-600 w-5 h-5"/> : <Circle className="text-slate-300 w-5 h-5"/>}
              Select All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div 
                  key={item._id} 
                  className={`bg-white p-6 rounded-[2rem] border transition-all flex flex-col sm:flex-row items-center gap-6 ${selectedIds.includes(item._id) ? 'border-teal-200 bg-teal-50/10' : 'border-slate-100'}`}
                >
                  <button onClick={() => toggleSelect(item._id)} className="shrink-0">
                    {selectedIds.includes(item._id) ? 
                      <CheckCircle2 className="w-7 h-7 text-teal-600" /> : 
                      <Circle className="w-7 h-7 text-slate-200" />
                    }
                  </button>

                  <div className="w-24 h-24 rounded-2xl bg-white border p-2 shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/${item.productId?.thumbnail}`}
                      alt="product"
                      className="w-full h-full object-contain"
                      onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-800">{item.productId?.name || "Product Name"}</h3>
                        <p className="text-teal-600 font-black">₹{item.productId?.final_price || 0}</p>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="text-slate-300 hover:text-red-500">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-xl overflow-hidden">
                        <button onClick={() => updateQty(item._id, item.qty - 1)} className="p-2 hover:bg-slate-50"><Minus size={14} /></button>
                        <span className="px-4 font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item._id, item.qty + 1)} className="p-2 hover:bg-slate-50"><Plus size={14} /></button>
                      </div>
                      <p className="font-bold text-slate-400">Total: ₹{( (item.productId?.final_price || 0) * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-100">
                 <ShoppingBag size={60} className="mx-auto text-slate-100 mb-4" />
                 <h2 className="text-xl font-bold text-slate-400">Your cart is empty</h2>
                 <Link href="/products" className="mt-4 inline-block text-teal-600 font-bold">Start Shopping</Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-10">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="flex justify-between mb-4 text-slate-500 font-bold">
                <span>Items Selected</span>
                <span>{totals.count}</span>
              </div>
              <div className="flex justify-between mb-8">
                <span className="font-bold">Total Amount</span>
                <span className="text-2xl font-black text-teal-600">₹{totals.total.toLocaleString()}</span>
              </div>

              <Link 
                href={selectedIds.length > 0 ? {
                  pathname: "/checkOut",
                  query: { items: selectedIds.join(',') }
                } : "#"} 
                className={selectedIds.length === 0 ? "pointer-events-none" : ""}
              >
                <button 
                  disabled={selectedIds.length === 0}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 disabled:opacity-30"
                >
                  Checkout <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;