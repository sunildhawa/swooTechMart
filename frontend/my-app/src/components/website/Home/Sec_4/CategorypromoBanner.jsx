import Image from 'next/image'

export default function CategoryPromoBanner() {
    return (
        <div className="relative bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-6 overflow-hidden">

            <div className="relative z-10 max-w-xs">
                <h3 className="text-xl font-semibold mb-2">
                    REDMI NOTE<br />12 PRO+ 5G
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                    Rise to the challenge
                </p>

                <button className="bg-black text-white text-sm px-4 py-2 rounded-md">
                    SHOP NOW
                </button>
            </div>

            <div className="absolute right-0 bottom-0 w-52 h-40">
                <img
                    src="https://m.media-amazon.com/images/I/81dblfYZOYL._SX679_.jpg"
                    alt="Redmi Banner"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    )
}