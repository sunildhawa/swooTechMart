import LaptopPromoBanner from './LeptopPromoBanner'
import LaptopQuickLinks from './LeptopQucikLink'
import BestSellerCard from '../../Global/BestSellerCard'

export default function SectionFive() {

    const products = [
        {
            image: 'https://m.media-amazon.com/images/I/51A7jucVNFL._AC_UF480,480_SR480,480_.jpg',
            title: 'Pineapple Macbook Pro 2022 M1 / 512 GB',
            price: 579,
            badges: ['FREE SHIPPING'],
            stockStatus: 'In stock',
        },
        {
            image: 'https://m.media-amazon.com/images/I/81XstkrCA8L._AC_UY327_FMwebp_QL65_.jpg',
            title: 'C&O Bluetooth Speaker',
            price: 979,
            badges: ['FREE SHIPPING'],
            stockStatus: 'In stock',
            variants: ['/products/speaker.png', '/products/speaker-black.png'],
        },
        {
            image: 'https://m.media-amazon.com/images/I/71h+7L8gcrL._AC_UY327_FMwebp_QL65_.jpg',
            title: 'Gigaby Customo Case, i7 / 16GB / SSD 256GB',
            price: 1259,
            badges: ['FREE SHIPPING', 'FREE GIFT'],
            stockStatus: 'In stock',
        },
        {
            image: 'https://m.media-amazon.com/images/I/71ZBa5+qu4L._AC_UY327_FMwebp_QL65_.jpg',
            title: 'BEOS PC Gaming Case',
            price: 1239,
            oldPrice: 1619,
            save: 59,
            stockStatus: 'Contact',
        },
        {
            image: 'https://m.media-amazon.com/images/I/51CIIx6l+VL._AC_UL480_FMwebp_QL65_.jpg',
            title: 'aMac All-in-one Computer M1',
            price: 1729,
            badges: ['FREE SHIPPING'],
            stockStatus: 'Contact',
        },
    ]

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">
                    BEST LAPTOPS & COMPUTERS
                </h3>
                <span className="text-sm text-gray-500 hover:text-teal-500 cursor-pointer">
                    View All
                </span>
            </div>

            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <LaptopPromoBanner />
                <div className="lg:col-span-2">
                    <LaptopQuickLinks />
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.map((product, index) => (
                    <BestSellerCard key={index} {...product} />
                ))}
            </div>

        </section>
    )
}