'use client'

import React from 'react';

export default function BestSellerCard({
    image,
    title,
    price,
    oldPrice,
    save,
    badges = [],
    stockStatus,
    id // _id ko as a prop pass karein agar zaroorat ho
}) {
    
    return (
        <div className="relative bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group cursor-pointer">

            {/* Save Badge */}
            {save > 0 && (
                <div className="absolute z-10 top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
                    SAVE ₹{save}
                </div>
            )}

            {/* Product Image */}
            <div className="relative h-44 mb-4 w-full flex items-center justify-center overflow-hidden bg-gray-50 rounded-xl">
                <img
                    alt={title || "Product"}
                    src={image}
                    className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                />
            </div>

            {/* Product Name */}
            <h4 className="text-sm font-bold mb-2 line-clamp-2 text-gray-800 min-h-[40px] group-hover:text-teal-600 transition-colors">
                {title}
            </h4>

            {/* Price Section */}
            <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-teal-600 font-black text-xl">
                        ₹{Number(price).toLocaleString('en-IN')}
                    </span>
                    {oldPrice && Number(oldPrice) > Number(price) && (
                        <span className="text-gray-400 text-xs line-through font-medium">
                            ₹{Number(oldPrice).toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                {/* Stock & Badges */}
                <div className="flex flex-col gap-2">
                    {stockStatus && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                            stockStatus.toLowerCase().includes('in') ? 'text-emerald-600' : 'text-rose-500'
                        }`}>
                            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                                stockStatus.toLowerCase().includes('in') ? 'bg-emerald-600' : 'bg-rose-500'
                            }`}></span>
                            {stockStatus}
                        </span>
                    )}
                    
                    {/* Badges Fix: Unique Key */}
                    <div className="flex flex-wrap gap-1 mt-1">
                        {badges && badges.length > 0 && badges.map((badge, index) => (
                            <span 
                                key={`badge-${id || 'card'}-${index}`} // Unique Key Fix
                                className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md uppercase font-bold tracking-tighter"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}