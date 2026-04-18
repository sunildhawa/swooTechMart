"use client"
import React from 'react';

import { Heart as HeartIcon, Share2 as ShareIcon, Star as StarIcon, Truck as TruckIcon, ShieldCheck as ShieldIcon } from 'lucide-react';
import { axiosAPIinstance } from "@/utils/webApiHepler";
import { toast } from "react-hot-toast"; 
import { useRouter } from 'next/navigation'; // Step 1: Router import karein

export default function AddToCartDetails({ data }) {
  const router = useRouter(); // Step 2: Router initialize karein

  const products = Array.isArray(data) ? data : data ? [data] : [];

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        // Step 3: notify ki jagah toast.error use karein (kyunki aapne wahi import kiya hai)
        toast.error("Please login to add items to cart");
        router.push("/contact"); // Step 4: Login page ka path check karein (usually /login hota hai)
        return;
      }

      const res = await axiosAPIinstance.post("cart", {
        productId: productId,
        qty: 1
      });
      
      toast.success("Product added to cart!"); 
    } catch (error) {
      const msg = error.response?.data?.message || "Add to cart failed";
      toast.error(msg);
    }
  };

  if (products.length === 0) {
    return <div className="p-10 text-center font-bold">No product details found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white">
      {products.map((item, index) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/${item.thumbnail}`;

        return (
          <div key={item._id || index} className="flex flex-col lg:flex-row gap-12 mb-20 last:mb-0 border-b pb-12 last:border-0">
            {/* LEFT: IMAGE SECTION */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="relative group w-full aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center p-6 transition-all hover:shadow-lg">
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />

                <button className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition">
                  <HeartIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
                </button>
              </div>

              <div className="flex gap-2 mt-6">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* RIGHT: DETAILS SECTION */}
            <div className="flex-1 flex flex-col pt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-indigo-600 font-black tracking-widest uppercase text-xs mb-2">
                    {item.brand || "Exclusive Store"}
                  </h2>
                  <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                    {item.name}
                  </h1>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-full transition">
                  <ShareIcon className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center bg-emerald-600 px-3 py-1 rounded-full text-white font-bold text-sm">
                  {item.rating || "4.5"} <StarIcon className="w-3.5 h-3.5 ml-1 fill-white" />
                </div>
                <span className="text-slate-400 text-sm font-semibold border-l border-slate-200 pl-4">
                  {item.reviews || "120"} Verified Reviews
                </span>
              </div>

              {/* Price Section */}
              <div className="mt-8 mb-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    ₹{Number(item.final_price || item.price).toLocaleString()}
                  </span>
                  {item.original_price && (
                    <>
                      <span className="text-xl text-slate-300 line-through">
                        ₹{Number(item.original_price).toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-orange-500">
                        {item.discount_percentage}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-emerald-600 text-xs font-black uppercase mt-2 tracking-wide">
                  ✓ Free Shipping & Fast Delivery
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3 mb-10">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Description
                </h3>
                <div 
                  className="text-slate-600 text-base leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-8 py-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500">
                  <TruckIcon className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <ShieldIcon className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">1 Year Warranty</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-black transition-all active:scale-[0.98] shadow-xl uppercase text-sm tracking-widest"
                >
                  Add To Bag
                </button>
                <button className="flex-1 border-2 border-slate-200 py-5 rounded-2xl font-black hover:bg-slate-50 transition-all text-sm uppercase tracking-widest text-slate-600">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}