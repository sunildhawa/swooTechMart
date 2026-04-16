
export default function DualPromoBanners() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-[#00A5A4] rounded-[35px] p-10 flex items-center justify-between relative overflow-hidden h-[220px] group">
        <div className="z-10 text-white">
            <h4 className="text-lg font-bold uppercase tracking-widest mb-1">Massage Chair</h4>
            <h3 className="text-2xl font-black uppercase mb-1">Luxury</h3>
            <p className="text-[10px] opacity-80 mb-6 font-medium">Fuka Relax Full Body <br/> Massage Chair</p>
            <button className="bg-white text-[#00A5A4] px-8 py-3 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow-lg">Shop Now</button>
        </div>
        <img src="https://m.media-amazon.com/images/I/51pMydBCaLL._AC_UL480_FMwebp_QL65_.jpg" alt="Chair" className="h-44 object-contain group-hover:scale-110 transition duration-500"/>
    </div>

    <div className="bg-[#1A1A1A] rounded-[35px] p-10 flex items-center justify-end relative overflow-hidden h-[220px]">
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
            <img src="https://m.media-amazon.com/images/I/71ZCX7UGj2L._AC_UL480_FMwebp_QL65_.jpg" className="h-40 object-contain"/>
        </div>
        <img src="https://m.media-amazon.com/images/I/61RhKPGNeUL._AC_UL480_FMwebp_QL65_.jpg" className="h-32 object-contain mr-10"/>
    </div>
</div>
    )
}