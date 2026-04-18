"use client";

import { getCategories } from "@/api/category";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await getCategories({ limit: 15 });
      setCategories(res?.data || []);
    };
    fetchCats();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 300;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full py-6">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 px-2">
          <div>
            <h2 className="font-black text-gray-900 uppercase text-[11px] tracking-[0.25em] mb-1">
              Top Categories
            </h2>
            <div className="h-1 w-8 bg-teal-500 rounded-full"></div>
          </div>
          <Link 
            href="/categories" 
            className="text-[11px] font-bold text-teal-600 bg-teal-50 px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-sm"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Navigation Buttons - Modern Glass Look */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-[60%] -translate-y-1/2 z-30 bg-white/90 p-3 rounded-full shadow-xl border border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 text-gray-700 backdrop-blur-sm"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-[60%] -translate-y-1/2 z-30 bg-white/90 p-3 rounded-full shadow-xl border border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 text-gray-700 backdrop-blur-sm"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>

        {/* Categories Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-2 py-4"
        >
          {categories
            ?.filter((item) => item.is_top === true)
            .map((cat, index) => (
              <div 
                key={index} 
                className="group cursor-pointer flex-shrink-0 flex flex-col items-center w-[100px]"
              >
                {/* Image Wrapper with Hover Effect */}
                <div className="relative w-20 h-20 mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2rem] group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500 ease-in-out shadow-sm group-hover:shadow-teal-100 group-hover:shadow-xl"></div>
                  
                  <div className="relative h-full w-full flex items-center justify-center p-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/category/${cat.image}`}
                      className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                      alt={cat.name}
                    />
                  </div>
                </div>

                {/* Category Name */}
                <p className="text-[11px] font-extrabold text-gray-500 group-hover:text-teal-600 uppercase tracking-tighter transition-colors text-center truncate w-full">
                  {cat.name}
                </p>
              </div>
            ))}
        </div>

        {/* Edge Fading Effects */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-transparent to-transparent z-10 rounded-l-[2.5rem] pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-transparent to-transparent z-10 rounded-r-[2.5rem] pointer-events-none"></div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}