'use client' // Wajib jika menggunakan hooks di Next.js App Router

import { useState, useEffect } from 'react'
import BestSellerCard from '../../Global/BestSellerCard'

import { getProducts } from '@/api/product'

export default function SectionThree() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null); // Pehle ka error saaf karein

                const response = await getProducts();

                // Axios mein data 'response.data' ke andar hota hai
                // Agar aapka API products array ko kisi key ke andar bhej raha hai (e.g. data.products), toh wo likhein
                const result = response.data?.data || response.data || [];

                setProducts(result);
            } catch (err) {
                // Agar 404 aa raha hai, toh console mein check karein ki URL kya ban raha hai
                console.error("API Error:", err.response);
                setError("Product nahi mil paye (404 Error)");
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);
    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-6 text-sm font-medium">
                    <button className="border-b-2 border-teal-500 pb-1">
                        BEST SELLER
                    </button>
                    <button className="text-gray-400">NEW IN</button>
                    <button className="text-gray-400">POPULAR</button>
                </div>

                <span className="text-sm text-gray-500 hover:text-teal-500 cursor-pointer">
                    View All
                </span>
            </div>

            {/* State Handling: Loading & Error */}
            {isLoading && <div className="text-center py-10">Memuat produk...</div>}
            {error && <div className="text-center py-10 text-red-500">Error: {error}</div>}

            {/* Grid */}
            {!isLoading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <BestSellerCard
                            key={product._id}
                            // API data ko Component props se match karein
                            title={product.name}
                            image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/product/${product.thumbnail}`} // Agar images 'uploads' folder mein hain
                            price={product.final_price}
                            oldPrice={product.original_price}
                            save={product.original_price - product.final_price}
                            stockStatus={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            badges={product.is_best_seller ? ['BEST SELLER'] : []}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}