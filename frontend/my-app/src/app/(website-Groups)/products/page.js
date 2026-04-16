"use client";
import { axiosAPIinstance } from "@/utils/webApiHepler";
import React, { useState, useEffect } from "react";
import { Filter, Search, ShoppingCart, X, IndianRupee, Tag, Layers, Palette, CircleDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getCategories } from "@/api/category";
import { getBrand } from "@/api/brand";
import { getProducts } from "@/api/product";
import { getColors } from "@/api/color";
import { notify } from "@/utils/apiHealpers";

export default function ProductsWithSidebar() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceRange, setPriceRange] = useState(100000); // Default Max Price
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadSidebarData = async () => {
      const [catRes, brandRes, colorRes] = await Promise.all([
        getCategories({ limit: 50, status: true }),
        getBrand({ limit: 50, status: true }),
        getColors({ limit: 50, status: true }),
      ]);
      setCategories(catRes?.data || []);
      setBrands(brandRes?.data || []);
      setColors(colorRes?.data || []);
    };
    loadSidebarData();
  }, []);

  // Filter change hone par fetch karein (Added priceRange to dependency)
  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategory, selectedBrand, selectedColor, priceRange, searchTerm]);

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const params = { status: true, limit: 100 };
      if (selectedCategory) params.category_id = selectedCategory;
      if (selectedBrand) params.brand_id = selectedBrand;
      if (selectedColor) params.color_id = selectedColor;
      if (searchTerm) params.search = searchTerm;
      if (priceRange) params.max_price = priceRange; // API support ke liye

      const res = await getProducts(params);
      
      // Client side filtering for price (agar API support na kare toh safety ke liye)
      const filteredData = (res?.data || []).filter(p => p.original_price <= priceRange);
      setProducts(filteredData);
    } catch (error) {
      console.error("Filter error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notify("Please login to add items to cart", false);
        router.push("/contact");
        return;
      }
      const res = await axiosAPIinstance.post("cart", { productId, qty: 1 });
      if (res?.data?.status || res?.data?.success) {
        notify("Product added to cart 🛒", true);
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      notify(error.response?.data?.message || "Error adding to cart", false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedColor(null);
    setPriceRange(100000);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Collection</h1>
            <p className="text-slate-500 mt-1">Discover {products.length} premium products</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-28 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                  <Filter size={20} className="text-blue-600" /> Filters
                </h2>
                {(selectedCategory || selectedBrand || selectedColor || searchTerm) && (
                  <button onClick={clearFilters} className="text-xs font-semibold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
                    <X size={14} /> Clear
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CircleDollarSign size={14}/> Price Range
                </h3>
                <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 font-bold text-slate-700 text-sm">
                  <span>₹0</span>
                  <span className="text-blue-600">Up to ₹{priceRange.toLocaleString()}</span>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Palette size={14}/> Colors
                </h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color._id}
                      onClick={() => setSelectedColor(color._id === selectedColor ? null : color._id)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === color._id ? "border-slate-900 scale-110 shadow-lg" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.code || color.name.toLowerCase() }}
                      title={color.name}
                    >
                      {selectedColor === color._id && <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={14}/> Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => setSelectedCategory(cat._id === selectedCategory ? null : cat._id)}
                      className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat._id ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Brands */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Tag size={14}/> Brands
                </h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand._id}
                      onClick={() => setSelectedBrand(brand._id === selectedBrand ? null : brand._id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        selectedBrand === brand._id ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-slate-200 rounded-3xl" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product._id} className="group bg-white rounded-3xl border border-slate-100 p-3 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
                    <Link href={`/cart/${product._id}`} className="block overflow-hidden rounded-2xl relative bg-slate-50">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/${product.thumbnail}`}
                        alt={product.name}
                        className="w-full h-64 object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>

                    <div className="px-2 py-4">
                      <h3 className="font-bold text-slate-800 truncate text-lg">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xl font-black text-slate-900 flex items-center">
                          <IndianRupee size={18} /> {product.original_price.toLocaleString()}
                        </p>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase">In Stock</span>
                      </div>

                      <button
                        onClick={() => addToCart(product._id)}
                        className="mt-5 w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95 transition-all shadow-lg"
                      >
                        <ShoppingCart size={19} /> Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <Search size={48} className="text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">No products matching filters</h3>
                <button onClick={clearFilters} className="mt-4 text-blue-600 font-bold hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}