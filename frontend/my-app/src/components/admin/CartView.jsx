"use client";
import React from 'react';
import { FiX, FiUser, FiPackage, FiTruck, FiCreditCard } from 'react-icons/fi';

export default function CartDetailPage({ isOpen, onClose, cartData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-end bg-black/50 backdrop-blur-sm">
      {/* Sidebar Modal (Right side se nikalne wala) */}
      <div className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Cart Details</h2>
            <p className="text-sm text-[#ff7b00]">ID: {cartData?.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* User Info */}
          <section className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 text-sm uppercase">
              <FiUser className="text-[#ff7b00]" /> Customer Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Name</p>
                <p className="font-semibold text-gray-700">{cartData?.user}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-semibold text-gray-700">{cartData?.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Address</p>
                <p className="font-semibold text-gray-700">H-24, Sector 63, Noida, UP</p>
              </div>
            </div>
          </section>

          {/* Items List */}
          <section>
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 text-sm uppercase">
              <FiPackage className="text-[#ff7b00]" /> Cart Items
            </h3>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4 border-b pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Premium Cotton T-Shirt</p>
                    <p className="text-xs text-gray-400">Qty: 2 | Size: L</p>
                  </div>
                  <p className="font-bold text-gray-800">₹1,299</p>
                </div>
              ))}
            </div>
          </section>

          {/* Billing */}
          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
             <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{cartData?.total}</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax (18%)</span><span>₹240</span></div>
             </div>
             <div className="flex justify-between items-center pt-4">
                <span className="font-bold text-lg text-gray-800">Grand Total</span>
                <span className="text-2xl font-black text-[#ff7b00]">₹{cartData?.total + 240}</span>
             </div>
             <button className="w-full bg-[#ff7b00] text-white py-4 rounded-xl font-bold mt-6 hover:bg-[#e66e00] transition shadow-lg shadow-orange-100">
               Confirm & Create Order
             </button>
          </section>
        </div>
      </div>
    </div>
  );
}