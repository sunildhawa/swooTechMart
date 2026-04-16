"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MapPin, Loader2, CheckCircle2, Circle } from 'lucide-react';
import { axiosAPIinstance } from "@/utils/webApiHepler";
import { notify } from "@/utils/apiHealpers";
import Link from 'next/link';

const ShopCart = () => {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const res = await axiosAPIinstance.get("cart/my-cart");
      const data = res?.data?.data || [];
      setProducts(data);
      
      setSelectedIds(data.map(p => p._id));
    } catch (error) {
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
    const originalProducts = [...products];
    setProducts(prev => prev.map(p => p._id === cartId ? { ...p, qty: newQty } : p));

    try {
      setUpdatingId(cartId);
      await axiosAPIinstance.put(`cart/${cartId}`, { qty: newQty });
      window.dispatchEvent(new Event("cartUpdated")); 
    } catch (error) {
      setProducts(originalProducts);
      notify("Failed to update quantity", false);
    } finally {
      setUpdatingId(null);
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
    const subtotal = selectedItems.reduce((acc, item) => 
      acc + (item.productId?.final_price * (item.qty || 1)), 0);
    const tax = subtotal * 0.18;
    return { subtotal, tax, total: subtotal, count: selectedItems.length };
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
        
        {/* Header with Select All */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <header>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-2xl">
                  <ShoppingBag className="w-8 h-8 text-teal-600" />
              </div>
              My Cart
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Manage and select items for checkout</p>
          </header>

          {products.length > 0 && (
            <button 
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
              {selectedIds.length === products.length ? <CheckCircle2 className="text-teal-600 w-5 h-5"/> : <Circle className="text-slate-300 w-5 h-5"/>}
              {selectedIds.length === products.length ? "Deselect All" : "Select All Items"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div 
                  key={item._id} 
                  className={`bg-white p-6 rounded-[2rem] shadow-sm border transition-all flex flex-col sm:flex-row items-center gap-6 group ${selectedIds.includes(item._id) ? 'border-teal-200 bg-teal-50/10' : 'border-slate-100'}`}
                >
                  {/* Custom Checkbox */}
                  <button onClick={() => toggleSelect(item._id)} className="shrink-0 transition-transform active:scale-90">
                    {selectedIds.includes(item._id) ? 
                      <CheckCircle2 className="w-7 h-7 text-teal-600 fill-teal-50" /> : 
                      <Circle className="w-7 h-7 text-slate-200" />
                    }
                  </button>

                  <div className="w-28 h-28 rounded-2xl bg-white border p-3 shrink-0 flex items-center justify-center shadow-sm">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/${item.productId?.thumbnail}`}
                      alt="product"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-800 line-clamp-1">{item.productId?.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                           <span className="text-xl font-black text-teal-600">₹{item.productId?.final_price}</span>
                           <span className="text-slate-300 line-through text-xs font-bold">₹{item.productId?.price}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <button 
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-slate-50"
                        ><Minus size={14} /></button>
                        <span className="w-10 text-center font-bold text-slate-700">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-slate-50"
                        ><Plus size={14} /></button>
                      </div>
                      <p className="font-black text-slate-400 text-sm">Total: ₹{(item.productId?.final_price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-100">
                 <ShoppingBag size={60} className="mx-auto text-slate-100 mb-4" />
                 <h2 className="text-xl font-bold text-slate-400">Your cart is empty</h2>
                 <Link href="/shop" className="mt-4 inline-block text-teal-600 font-bold hover:underline">Go to Shop</Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-10">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Selected Items</span>
                  <span>{totals.count}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-black">₹{totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500 font-black uppercase tracking-tighter">Free</span>
                </div>
                
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grand Total</p>
                    <p className="text-3xl font-black text-teal-600">₹{totals.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <Link 
                href={selectedIds.length > 0 ? {
                  pathname: "/checkOut",
                  query: { items: selectedIds.join(',') }
                } : "#"} 
                className="block"
              >
                <button 
                  disabled={selectedIds.length === 0}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-teal-600 transition-all shadow-xl disabled:opacity-20"
                >
                  Checkout ({totals.count}) <ArrowRight size={20} />
                </button>
              </Link>
              
              <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
                Safe & Secure Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopCart;