import Image from 'next/image'

const categories = [
    { name: 'Macbook', items: 74, icon: 'https://m.media-amazon.com/images/I/71wnHOMW9DL._AC_UL480_FMwebp_QL65_.jpg' },
    { name: 'Gaming PC', items: 5, icon: 'https://m.media-amazon.com/images/I/71y2eWQDhjL._AC_UY327_FMwebp_QL65_.jpg' },
    { name: 'Laptop Office', items: 22, icon: 'https://m.media-amazon.com/images/I/61MaufVR6KL._AC_UY327_FMwebp_QL65_.jpg' },
    { name: 'Laptop 15"', items: 55, icon: 'https://m.media-amazon.com/images/I/31UYLBlKWlL._SY300_SX300_QL70_FMwebp_.jpg' },
    { name: 'M1 2023', items: 32, icon: 'https://m.media-amazon.com/images/I/513aVVU88kL._AC_UF480,480_SR480,480_.jpg' },
    { name: 'Secondhand', items: 16, icon: 'https://m.media-amazon.com/images/I/71ifL1ZP0GL._AC_UF480,480_SR480,480_.jpg' },
]

export default function LaptopQuickLinks() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">

                    <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded-lg p-1 group-hover:scale-110 transition-transform">
                        {/* Fix: Capital 'Image' use kiya and standard img ko hataya */}
                        <Image
                            src={cat.icon}
                            alt={cat.name}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                        />
                    </div>

                    <div className="overflow-hidden">
                        <p className="text-[13px] font-bold text-gray-800 leading-tight group-hover:text-[#00A896] transition-colors">
                            {cat.name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                            {cat.items} Items
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}