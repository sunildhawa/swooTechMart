export default function RecentlyViewedRow() {
  return (
   
<div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">Your Recently Viewed</h2>
            <div className="flex items-center gap-4">
                <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-teal-500 uppercase">View All</a>
                <div className="flex gap-1">
                    <div className="w-8 h-1 bg-teal-500 rounded-full"></div>
                    <div className="w-4 h-1 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                    <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                    <img src="https://m.media-amazon.com/images/I/819DWQLgjKL._AC_UL480_FMwebp_QL65_.jpg" className="w-16 h-16 object-contain"/>
                </div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold">(152)</p>
                    <h4 className="text-[12px] font-bold text-gray-800 group-hover:text-teal-500 leading-tight">Xomie Remid 8 Sport Water Resitance Watch</h4>
                    <p className="text-sm font-black text-gray-900 mt-1">$579.00</p>
                </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                    <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                    <img src="https://m.media-amazon.com/images/I/61Famx7xQwL._AC_UL480_FMwebp_QL65_.jpg" className="w-16 h-16 object-contain"/>
                </div>
                <div>
                    <h4 className="text-[12px] font-bold text-gray-800 group-hover:text-teal-500 leading-tight">Microte Surface 2.0 Laptop</h4>
                    <p className="text-sm font-black text-gray-900 mt-1">$979.00</p>
                </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
                <img src="https://m.media-amazon.com/images/I/61V9NlP5unL._AC_UL480_FMwebp_QL65_.jpg" className="w-16 h-16 object-contain"/>
                <div>
                    <h4 className="text-[12px] font-bold text-gray-800 group-hover:text-teal-500 leading-tight">aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular...</h4>
                    <p className="text-sm font-black text-gray-900 mt-1">$979.00 - $1,259.00</p>
                </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                    <span className="absolute -top-2 -left-2 bg-teal-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">SAVE $192.00</span>
                    <img src="https://m.media-amazon.com/images/I/61Q8EUtsdmL._AC_UL480_FMwebp_QL65_.jpg" className="w-16 h-16 object-contain"/>
                </div>
                <div>
                    <p className="text-[9px] text-gray-400 font-bold">(152)</p>
                    <h4 className="text-[12px] font-bold text-gray-800 group-hover:text-teal-500 leading-tight">SROK Smart Phone 128GB, Oled Retina</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-teal-500">$579.00</span>
                        <span className="text-[10px] text-gray-400 line-through">$779.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}