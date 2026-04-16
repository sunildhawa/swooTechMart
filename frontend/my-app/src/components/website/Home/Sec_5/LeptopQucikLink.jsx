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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-3">

                    <div className="relative w-10 h-10">
                        <img
                            src={cat.icon}
                            alt={cat.name}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-medium">{cat.name}</p>
                        <p className="text-xs text-gray-500">{cat.items} Items</p>
                    </div>
                </div>
            ))}
        </div>
    )
}