import HeroBannerImg from './HeroBanner.png'
import Image from 'next/image'

export default function HeroBanner() {
    return (
        <div className="lg:col-span-3 relative overflow-hidden rounded-xl bg-gray-100">
            <Image
                src={HeroBannerImg}
                alt="Electronics Banner"
                fill
                priority
            />
            <section className="lg:col-span-9 hero-bg rounded-[40px] relative overflow-hidden flex items-center justify-center p-8 text-center min-h-[450px]">
                <div className="z-10 max-w-2xl text-white">
                    <h2 className="text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">
                        Don't miss amazing <br /> grocery deals
                    </h2>
                    <p className="text-xl opacity-90 mb-8 font-medium">Sign up for the daily newsletter</p>
                    <div className="flex bg-white/20 backdrop-blur-md p-1.5 rounded-full border border-white/30 max-w-md mx-auto">
                        <input type="email" placeholder="Your email address" className="bg-transparent px-5 py-2 outline-none flex-1 text-sm text-white placeholder:text-white/60" />
                        <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-teal-600 transition-all">Subscribe</button>
                    </div>
                </div>
                <div className="absolute bottom-6 flex gap-2">
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                </div>
            </section>

            {/* Overlay */}
        </div>
    )
}