import { getCategories } from "@/api/category";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import CategoryImage from "@/components/website/CategoryImage";
export default async function AllCategoriesPage() {
  // Sabhi categories fetch karein (limit hata di hai taaki sab dikhein)
  const categories = await getCategories({ status: true });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="w-5 h-5 text-teal-600" />
              <span className="text-teal-600 font-bold text-xs uppercase tracking-widest">Explore</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              All <span className="text-teal-600">Categories</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm font-medium">
              Browse through our wide range of products across different departments.
            </p>
          </div>
          <div className="text-sm font-bold text-gray-400 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            Total {categories?.data?.length || 0} Departments
          </div>
        </div>

        {/* Grid Section */}
        {categories?.data?.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
            <h2 className="text-xl font-bold text-gray-400">No categories found.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories?.data?.map((item, index) => (
              <Link
                key={item.id || index}
                href={`/products?category=${item.id}`}
                className="group relative bg-white rounded-[2rem] p-6 border border-gray-100 hover:border-teal-200 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center text-center"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-teal-50/0 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>

                {/* Image Container */}
                <div className="relative z-10 w-32 h-32 mb-6 rounded-3xl overflow-hidden bg-gray-50 border border-gray-50 flex-shrink-0">
                  <CategoryImage
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/category/${item.image}`}
                    name={item.name}
                  />

                  {/* Item Count Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-teal-600 text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
                    {item.count || 0}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-black text-gray-800 group-hover:text-teal-600 transition-colors mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-gray-400 group-hover:text-teal-500 transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Shop Collection</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom Border Decoration */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-teal-500 rounded-full group-hover:w-12 transition-all duration-500"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}