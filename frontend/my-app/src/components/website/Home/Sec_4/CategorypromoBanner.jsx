import Image from 'next/image'

export default function CategoryPromoBanner() {
    return (
        <div className="relative bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-6 overflow-hidden min-h-[160px]">

            <div className="relative z-10 max-w-xs">
                <h3 className="text-xl font-semibold mb-2">
                    REDMI NOTE<br />12 PRO+ 5G
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                    Rise to the challenge
                </p>

                <button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    SHOP NOW
                </button>
            </div>

            {/* Fix: Capital 'Image' use karein aur fill ke saath object-contain */}
            <div className="absolute right-0 bottom-0 w-52 h-40">
                <Image
                    src="https://m.media-amazon.com/images/I/81dblfYZOYL._SX679_.jpg"
                    alt="Redmi Banner"
                    fill
                    className="object-contain object-right-bottom"
                    sizes="(max-width: 768px) 100vw, 208px"
                />
            </div>
        </div>
    )
}