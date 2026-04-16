import Image from 'next/image'

const categories = [
    { name: 'iPhone (iOS)', items: 74, icon: 'https://m.media-amazon.com/images/I/71657TiFeHL._AC_UY327_FMwebp_QL65_.jpg' },
    { name: 'Android', items: 35, icon: 'https://m.media-amazon.com/images/I/812OvmyYPmL._AC_SS230_.jpg' },
    { name: '5G Support', items: 12, icon: 'https://m.media-amazon.com/images/I/61Elhm6F8xL._AC_SS230_.jpg' },
    { name: 'Gaming', items: 9, icon: 'https://m.media-amazon.com/images/I/61EUYqQSoTL._AC_UF480,480_SR480,480_.jpg' },
    { name: 'Xiaomi', items: 52, icon: 'https://images-eu.ssl-images-amazon.com/images/I/61oa+zoqwmL._AC_UL330_SR330,330_.jpg' },
    { name: 'Accessories', items: 29, icon: 'https://images-eu.ssl-images-amazon.com/images/I/71ZLe2G7GjL._AC_UL330_SR330,330_.jpg' },
]

export default function CategoryQuickLinks() {
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