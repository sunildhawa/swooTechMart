const Breadcrumb = () => {
    return (
       <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-800 tracking-tight uppercase">Top Cellphones & Tablets</h2>
        <a href="#" className="text-xs font-bold text-gray-400 hover:text-teal-500 transition uppercase tracking-widest">View All</a>
    </div>

    <div className="flex flex-col lg:flex-row gap-6 mb-10">
        <div className="lg:w-[55%] bg-[#E5E7EB] rounded-[30px] p-10 flex items-center justify-between relative overflow-hidden h-[240px]">
            <div className="z-10 max-w-[200px]">
                <h3 className="text-3xl font-black text-gray-900 leading-[1.1] mb-2 uppercase italic">REDMI NOTE <br/> 12 PRO+ 5G</h3>
                <p className="text-[13px] text-gray-500 font-medium mb-6">Rise to the challenge</p>
                <button className="bg-[#1A1A1A] text-white text-[11px] font-bold px-8 py-3 rounded-xl hover:bg-teal-600 transition-all uppercase tracking-widest">Shop Now</button>
            </div>
            <img src="https://m.media-amazon.com/images/I/71duj67vS7L._AC_SL1500_.jpg" className="h-56 object-contain absolute right-4 bottom-0 drop-shadow-2xl"/>
        </div>

        <div className="lg:w-[45%] grid grid-cols-3 gap-x-4 gap-y-6 self-center">
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="leading-tight">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-teal-500 transition">iPhone (iOS)</p>
                    <p className="text-[11px] text-gray-400 font-medium">74 Items</p>
                </div>
                <img src="https://m.media-amazon.com/images/I/61m6-N99bML._AC_SL1500_.jpg" className="w-10 h-10 object-contain ml-auto grayscale group-hover:grayscale-0 transition"/>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer border-x px-4 border-gray-100">
                <div className="leading-tight">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-teal-500 transition">Android</p>
                    <p className="text-[11px] text-gray-400 font-medium">35 Items</p>
                </div>
                <img src="https://m.media-amazon.com/images/I/71duj67vS7L._AC_SL1500_.jpg" className="w-10 h-10 object-contain ml-auto grayscale group-hover:grayscale-0 transition"/>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="leading-tight">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-teal-500 transition">5G Support</p>
                    <p className="text-[11px] text-gray-400 font-medium">12 Items</p>
                </div>
                <img src="https://m.media-amazon.com/images/I/61WfS8BfSgL._AC_SL1500_.jpg" className="w-10 h-10 object-contain ml-auto grayscale group-hover:grayscale-0 transition"/>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="leading-tight">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-teal-500 transition">Gaming</p>
                    <p className="text-[11px] text-gray-400 font-medium">9 Items</p>
                </div>
                <img src="https://m.media-amazon.com/images/I/51XvVl569zL._AC_SL1500_.jpg" className="w-10 h-10 object-contain ml-auto grayscale group-hover:grayscale-0 transition"/>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer border-x px-4 border-gray-100">
                <div className="leading-tight">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-teal-500 transition">Xiaomi</p>
                    <p className="text-[11px] text-gray-400 font-medium">52 Items</p>
                </div>
                <img src="https://m.media-amazon.com/images/I/51f4zWv8fBL._AC_SL1200_.jpg" className="w-10 h-10 object-contain ml-auto grayscale group-hover:grayscale-0 transition"/>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="leading-tight">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-teal-500 transition">Accessories</p>
                    <p className="text-[11px] text-gray-400 font-medium">29 Items</p>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/3039/3039391.png" className="w-10 h-10 object-contain ml-auto grayscale group-hover:grayscale-0 transition"/>
            </div>
        </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-300 text-xs z-10 border border-gray-50"><i className="fa-solid fa-chevron-left"></i></button>
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-300 text-xs z-10 border border-gray-50"><i className="fa-solid fa-chevron-right"></i></button>

        <div className="bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all relative">
            <span className="absolute top-4 left-4 bg-teal-500 text-white text-[9px] font-bold px-2 py-1 rounded-lg">SAVE $199.00</span>
            <div className="h-44 flex items-center justify-center mb-4">
                <img src="https://m.media-amazon.com/images/I/71Y677N44NL._AC_SL1500_.jpg" className="h-40 object-contain"/>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1">(152)</p>
            <h4 className="text-[13px] font-bold text-gray-800 leading-tight mb-2 h-10">SROK Smart Phone 128GB, Oled Retina</h4>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-teal-500">$579.00</span>
                <span className="text-[13px] text-gray-400 line-through">$859.00</span>
            </div>
            <span className="text-[8px] font-bold bg-teal-50 text-teal-600 px-2 py-1.5 rounded uppercase tracking-tighter">Free Shipping</span>
            <div className="text-[10px] text-teal-500 font-bold flex items-center gap-1 mt-3">
                <i className="fa-solid fa-circle-check"></i> In stock
            </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all relative">
            <span className="absolute top-4 left-4 bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded-lg">NEW</span>
            <div className="h-44 flex items-center justify-center mb-4">
                <img src="https://m.media-amazon.com/images/I/61goy0Fh8pL._AC_SL1500_.jpg" className="h-40 object-contain"/>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1"></p>
            <h4 className="text-[13px] font-bold text-gray-800 leading-tight mb-2 h-10">aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular...</h4>
            <p className="text-lg font-bold text-gray-900 mb-3">$979.00 - $1,259.00</p>
            <span className="text-[8px] font-bold bg-gray-100 text-gray-500 px-2 py-1.5 rounded uppercase tracking-tighter">$2.98 SHIPPING</span>
            <div className="text-[10px] text-teal-500 font-bold flex items-center gap-1 mt-3">
                <i className="fa-solid fa-circle-check"></i> In stock
            </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all">
            <div className="h-44 flex items-center justify-center mb-4">
                <img src="https://m.media-amazon.com/images/I/61m6-N99bML._AC_SL1500_.jpg" className="h-40 object-contain"/>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1">(5)</p>
            <h4 className="text-[13px] font-bold text-gray-800 leading-tight mb-2 h-10">OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS</h4>
            <p className="text-lg font-bold text-gray-900 mb-3">$659.00</p>
            <div className="flex gap-1 mb-3">
                <span className="text-[8px] font-bold bg-teal-50 text-teal-600 px-2 py-1.5 rounded uppercase tracking-tighter">Free Shipping</span>
                <span className="text-[8px] font-bold bg-teal-50 text-teal-600 px-2 py-1.5 rounded uppercase tracking-tighter">Free Gift</span>
            </div>
            <div className="text-[10px] text-teal-500 font-bold flex items-center gap-1 mt-2">
                <i className="fa-solid fa-circle-check"></i> In stock
            </div>
            <div className="flex gap-2 mt-2">
                <div className="w-6 h-6 border-2 border-teal-500 rounded p-0.5"><img src="https://via.placeholder.com/20" className="rounded-sm"/></div>
                <div className="w-6 h-6 border border-gray-100 rounded p-0.5"><img src="https://via.placeholder.com/20" className="rounded-sm"/></div>
                <div className="w-6 h-6 border border-gray-100 rounded p-0.5"><img src="https://via.placeholder.com/20" className="rounded-sm"/></div>
            </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all relative">
            <span className="absolute top-4 left-4 bg-teal-500 text-white text-[9px] font-bold px-2 py-1 rounded-lg">SAVE $59.00</span>
            <div className="h-44 flex items-center justify-center mb-4">
                <img src="https://m.media-amazon.com/images/I/71Y677N44NL._AC_SL1500_.jpg" className="h-40 object-contain"/>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1">(9)</p>
            <h4 className="text-[13px] font-bold text-gray-800 leading-tight mb-2 h-10">Xiamoi Redmi Note 5, 64GB</h4>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-teal-500">$1,239.00</span>
                <span className="text-[13px] text-gray-400 line-through">$1,619.00</span>
            </div>
            <span className="text-[8px] font-bold bg-teal-50 text-teal-600 px-2 py-1.5 rounded uppercase tracking-tighter">Free Shipping</span>
            <p className="text-[11px] font-bold text-gray-400 mt-3 cursor-pointer hover:text-teal-500 transition">Contact</p>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all">
            <div className="h-44 flex items-center justify-center mb-4">
                <img src="https://m.media-amazon.com/images/I/61goy0Fh8pL._AC_SL1500_.jpg" className="h-40 object-contain"/>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mb-1">(8)</p>
            <h4 className="text-[13px] font-bold text-gray-800 leading-tight mb-2 h-10">Microsute Alpha Ultra S5 Surface 128GB 2022, Sliver</h4>
            <p className="text-lg font-bold text-gray-900 mb-3">$1,729.00</p>
            <span className="text-[8px] font-bold bg-teal-50 text-teal-600 px-2 py-1.5 rounded uppercase tracking-tighter">Free Shipping</span>
            <p className="text-[11px] font-bold text-gray-400 mt-3 cursor-pointer hover:text-teal-500 transition">Contact</p>
            <div className="flex gap-2 mt-2">
                <div className="w-6 h-6 border border-gray-100 rounded p-0.5"><img src="https://via.placeholder.com/20" className="rounded-sm"/></div>
                <div className="w-6 h-6 border border-gray-100 rounded p-0.5"><img src="https://via.placeholder.com/20" className="rounded-sm"/></div>
            </div>
        </div>
    </div>
</div>
    );
};

export default Breadcrumb;