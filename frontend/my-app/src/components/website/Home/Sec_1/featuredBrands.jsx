"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBrand } from "@/api/brand";

export default function TopCategories() {
  const [brands, setBrands] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getBrand({ limit: 15} ,{status: true});
      setBrands(res?.data || []);
    };
    fetchBrands();
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
             Featured Brands      
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
          {brands
            ?.filter((item) => item.is_top === true)
            .map((brand, index) => (
              <div 
                key={index} 
                className="group cursor-pointer flex-shrink-0 flex flex-col items-center w-[100px]"
              >
                {/* Image Wrapper with Hover Effect */}
                <div className="relative w-20 h-20 mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2rem] group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500 ease-in-out shadow-sm group-hover:shadow-teal-100 group-hover:shadow-xl"></div>
                  
                  <div className="relative h-full w-full flex items-center justify-center p-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/brand/${brand.image}`}
                      className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                      alt={brand.name}
                    />
                  </div>
                </div>

                {/* Category Name */}
                <p className="text-[11px] font-extrabold text-gray-500 group-hover:text-teal-600 uppercase tracking-tighter transition-colors text-center truncate w-full">
                  {brand.name}
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


// "use client";

// import { getBrand } from "@/api/brand";
// import { useEffect, useState, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function FeaturedBrands() {
//   const [brands, setBrands] = useState([]);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       const res = await getBrand({ limit: 12, status: true, is_home: true });
//       setBrands(res?.data || []);
//     };
//     fetchBrands();
//   }, []);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const { scrollLeft } = scrollRef.current;
//       const scrollAmount = 400; // Brands ke liye thoda zyada scroll behtar lagta hai
//       scrollRef.current.scrollTo({
//         left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const displayBrands = [...brands, ...brands];

//   return (
//     <div className="py-12 bg-[#f8f9fa]">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Main Glass Container */}
//         <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/20 relative group overflow-hidden">
          
//           {/* Header Section */}
//           <div className="flex justify-between items-center mb-12 px-4">
//             <div>
//               <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase !tracking-[0.3em] text-sm">
//                 Featured Brands
//               </h2>
//               <div className="h-1.5 w-12 bg-gray-900 mt-2 rounded-full"></div>
//               <p className="text-gray-400 text-xs font-medium mt-3 uppercase tracking-widest">
//                 Our Global Partners
//               </p>
//             </div>
//           </div>

//           {/* Navigation Buttons - Floating Style */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-6 top-[60%] -translate-y-1/2 z-30 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gray-900 hover:text-white transform -translate-x-4 group-hover:translate-x-0"
//           >
//             <ChevronLeft size={24} strokeWidth={2.5} />
//           </button>

//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-6 top-[60%] -translate-y-1/2 z-30 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gray-900 hover:text-white transform translate-x-4 group-hover:translate-x-0"
//           >
//             <ChevronRight size={24} strokeWidth={2.5} />
//           </button>

//           {/* Brands Scrollable Area */}
//           <div 
//             ref={scrollRef}
//             className="flex gap-10 items-center overflow-x-auto no-scrollbar scroll-smooth pb-4"
//           >
//             <div className="flex gap-10 items-center whitespace-nowrap">
//               {displayBrands.map((b, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 w-44 h-24 bg-white/50 rounded-2xl flex items-center justify-center p-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out border border-transparent hover:border-gray-100 group/item"
//                 >
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/brand/${b.image}`}
//                     alt={b.name}
//                     className="max-h-full max-w-full object-contain transform group-hover/item:scale-110 transition-transform duration-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Edge Gradients - For Smooth Transitions */}
//           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/60 to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/60 to-transparent z-10 pointer-events-none"></div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }