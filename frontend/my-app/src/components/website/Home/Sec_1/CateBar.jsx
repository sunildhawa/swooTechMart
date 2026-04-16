"use client";
import { useEffect, useState } from "react";
import { getCategories } from "@/api/category";
import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";

export default function CategorySidebar() {
  const [categorise, setCategorise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Limit ko badha diya taaki scroll test ho sake
        const data = await getCategories({ limit: 15, status: true, is_home: true });
        setCategorise(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="p-8 text-center animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-4"></div>
      <div className="space-y-3">
        {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl"></div>)}
      </div>
    </div>
  );

  return (
    <aside className="lg:col-span-1 bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
        <div className="p-2 bg-teal-50 rounded-lg">
           <LayoutGrid size={18} className="text-teal-600" />
        </div>
        <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">
            Categories
        </h3>
      </div>

      {/* Scroll Container: 
          - max-h-[320px] 5 items (approx 64px each) ke liye perfect hai.
          - custom-scrollbar class CSS ke liye hai.
      */}
      <ul className="space-y-1.5 max-h-[320px] overflow-y-auto pr-2 custom-sidebar-scroll">
        {categorise?.data?.map((item, index) => (
          <Link key={item.id || index} href={`/products?category=${item.id}`}>
            <li className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-teal-50/50 border border-transparent hover:border-teal-100 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 group-hover:shadow-md transition-all">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/category/${item.image}`}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={item.name}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Category"; }}
                  />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-teal-600 transition-colors block leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                    {item.count || 0} Products
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                 <ChevronRight size={14} className="text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {/* View All Footer */}
      <Link href="/products" className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-t border-gray-50 text-[11px] font-black text-gray-400 hover:text-teal-600 transition-all uppercase tracking-tighter">
        View All Departments
      </Link>

      {/* Inline Styles for Professional Scrollbar */}
      <style jsx>{`
        .custom-sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 20px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #0d9488;
        }
      `}</style>
    </aside>
  );
}