import Image from 'next/image'

export default function LaptopPromoBanner() {
    return (
        <div className="relative bg-neutral-900 rounded-xl p-6 overflow-hidden text-white min-h-[180px]">

            <div className="relative z-10 max-w-xs">
                <h3 className="text-2xl font-semibold mb-1 leading-tight">
                    MacBook Air<br />Supercharged
                </h3>

                <p className="text-sm opacity-80 mb-3">
                    By M2 chip
                </p>

                <p className="text-sm mb-4">
                    Starts from <span className="text-teal-400 font-semibold">$1,199</span>
                </p>

                <button className="bg-white text-black text-sm px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
                    SHOP NOW
                </button>
            </div>

            {/* Fix: Capital 'Image' use kiya aur absolute container ko align kiya */}
            <div className="absolute right-0 bottom-0 w-64 h-44">
                <Image
                    src="https://m.media-amazon.com/images/I/51w3cMTbEqL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Macbook Banner"
                    fill
                    className="object-contain object-right-bottom"
                    sizes="(max-width: 768px) 100vw, 256px"
                />
            </div>
        </div>
    )
}