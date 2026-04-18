"use client";
import { axiosAPIinstance } from "@/utils/webApiHepler";
import React, { useState, useEffect, useCallback } from "react";
import { Filter, Search, ShoppingCart, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getCategories } from "@/api/category";
import { getBrand } from "@/api/brand";
import { getProducts } from "@/api/product";
import { getColors } from "@/api/color";
import { notify } from "@/utils/apiHealpers";

export default function ProductsWithSidebar() {
  const router = useRouter();
  
  // Data States
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceRange, setPriceRange] = useState(200000); 
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Initial Data Load
  useEffect(() => {
    const loadSidebarData = async () => {
      try {
        const [catRes, brandRes, colorRes] = await Promise.all([
          getCategories({ limit: 50, status: true }),
          getBrand({ limit: 50, status: true }),
          getColors({ limit: 50, status: true }),
        ]);
        setCategories(catRes?.data || []);
        setBrands(brandRes?.data || []);
        setColors(colorRes?.data || []);
      } catch (err) { 
        console.error("Sidebar Error:", err); 
      }
    };
    loadSidebarData();
  }, []);

  // 2. FETCH LOGIC
  const fetchFilteredProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = { status: true, limit: 100 };
      
      if (selectedCategory) params.category_id = selectedCategory;
      if (selectedBrand) params.brand_id = selectedBrand;
      if (selectedColor) params.color_id = selectedColor;
      if (searchTerm) params.search = searchTerm;
      if (priceRange) params.max_price = priceRange;

      const res = await getProducts(params);
      const data = res?.data || [];
      
      const filtered = data.filter(p => Number(p.original_price) <= priceRange);
      setProducts(filtered);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Fetch Error:", error);
      notify("error", "Failed to load products", false);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, selectedColor, priceRange, searchTerm]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  // --- FIXED: ADD TO CART API LOGIC ---
const addToCart = async (productId) => {
    try {
      const response = await axiosAPIinstance.post("/cart", {
        productId: productId,
        qty: 1
      });

      if (response.data.success || response.status === 200) {
        // SAHI TARIKA: notify(message, isSuccessBoolean)
        notify("Product added to cart!", true); // Ye GREEN dikhayega
        
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Cart API Error:", error);
      const errorMsg = error.response?.data?.message || "Failed to add to cart";
      
      // FIX: Pehla argument message, dusra FALSE (error ke liye)
      notify(errorMsg, false); // Ye ab RED dikhayega
    }
  };
  const handleCategorySelect = (id) => {
    setSelectedCategory(prev => (prev === id ? null : id));
    setSelectedBrand(null);
    setSelectedColor(null);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedColor(null);
    setPriceRange(200000);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-[#fbfcfd]">
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Our Collection</h1>
            <p className="text-slate-500 font-medium text-sm">Found {products.length} Products</p>
          </div>
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none shadow-sm focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Area */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-24 h-[calc(100vh-120px)] flex flex-col overflow-hidden">
              
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Filter size={18} className="text-blue-600" /> Filters
                </h2>
                <button onClick={clearFilters} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100">RESET</button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => handleCategorySelect(cat._id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          selectedCategory === cat._id ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="pt-6 border-t border-slate-50">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Brands</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand._id}
                        onClick={() => setSelectedBrand(brand._id === selectedBrand ? null : brand._id)}
                        className={`px-2 py-2.5 rounded-lg text-[10px] font-bold border transition-all ${
                          selectedBrand === brand._id ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="pt-6 border-t border-slate-50">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((color) => (
                      <button
                        key={color._id}
                        onClick={() => setSelectedColor(color._id === selectedColor ? null : color._id)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === color._id ? "border-slate-900 scale-110 shadow-md" : "border-white shadow-sm"
                        }`}
                        style={{ backgroundColor: color.code || color.name.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="pt-6 border-t border-slate-50">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Price Range</h3>
                  <input 
                    type="range" min="0" max="200000" step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="mt-2 text-right text-sm font-black text-slate-900">₹{priceRange.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[400px] bg-slate-100 rounded-[32px] animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product._id} className="group bg-white rounded-[32px] border border-slate-100 p-4 hover:shadow-2xl transition-all duration-500">
                    <Link href={`/cart/${product._id}`} className="block overflow-hidden rounded-[24px] bg-[#f8fafc] aspect-square">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/product/${product.thumbnail}`}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.target.src = "/placeholder-image.png"; }}
                      />
                    </Link>
                    <div className="mt-6 px-2">
                      <h3 className="font-bold text-slate-800 truncate text-lg">{product.name}</h3>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-2xl font-black text-slate-900">
                           ₹{Number(product.original_price).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product._id)}
                        className="mt-6 w-full bg-slate-900 text-white py-4 rounded-[20px] font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
                      >
                        <ShoppingCart size={19} /> Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                <LayoutGrid size={48} className="text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">No products matching filters</h3>
                <button onClick={clearFilters} className="mt-6 text-blue-600 font-bold hover:underline">Reset All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}