import Image from 'next/image'

export default function LaptopPromoBanner() {
    return (
        <div className="relative bg-neutral-900 rounded-xl p-6 overflow-hidden text-white">

            <div className="relative z-10 max-w-xs">
                <h3 className="text-2xl font-semibold mb-1">
                    Mobok 2<br />Superchard
                </h3>

                <p className="text-sm opacity-80 mb-3">
                    By M2
                </p>

                <p className="text-sm mb-4">
                    Start from <span className="text-teal-400 font-semibold">$1,199</span>
                </p>

                <button className="bg-white text-black text-sm px-4 py-2 rounded-md">
                    SHOP NOW
                </button>
            </div>

            <div className="absolute right-4 bottom-0 w-60 h-40">
                <img
                    src="https://m.media-amazon.com/images/I/51w3cMTbEqL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Macbook Banner"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    )
}