import Image from 'next/image'

export default function DealsOfTheDay() {
    return (
        <>

            {/* Header */}
    <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 relative">
        <div className="bg-[#00A5A4] text-white py-3 px-8 font-bold text-sm tracking-wider flex justify-between items-center">
            <span>DEALS OF THE DAY</span>
            <span className="text-[10px] opacity-80 font-normal">e w A</span>
        </div>
        
        <div className="p-8 flex flex-col md:flex-row gap-10">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <img src="https://m.media-amazon.com/images/I/71E+NLQFhgL._AC_UY327_FMwebp_QL65_.jpg" className="w-10 h-10 rounded border p-1 opacity-50"/>
                    <img src="https://m.media-amazon.com/images/I/61EoCnDyoQL._AC_UY327_FMwebp_QL65_.jpg" className="w-10 h-10 rounded border p-1 opacity-50"/>
                    <img src="https://m.media-amazon.com/images/I/71T10gT0BSL._AC_UY327_FMwebp_QL65_.jpg" className="w-10 h-10 rounded border p-1 border-teal-500"/>
                    <div className="w-0.5 h-16 bg-gray-200 mx-auto mt-2"></div>
                </div>
                <div className="relative">
                    <div className="absolute top-0 left-0 bg-[#00A5A4] text-white text-[10px] p-2 rounded-lg leading-tight font-bold">
                        SAVE <br/> $199.00
                    </div>
                    <img src="https://m.media-amazon.com/images/I/71duj67vS7L._AC_SL1500_.jpg" alt="Smartphone" className="h-80 object-contain"/>
                </div>
            </div>

            <div className="flex-1 space-y-4">
                <p className="text-gray-400 text-xs">(12)</p>
                <h3 className="text-xl font-bold text-gray-800">Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone</h3>
                
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-[#00A5A4]">$569.00</span>
                    <span className="text-gray-400 line-through text-lg font-medium">$759.00</span>
                </div>

                <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4 font-medium">
                    <li>Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</li>
                    <li>DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</li>
                    <li>Commanding Power Design: Twin 16+1+2 Phases Digital VRM</li>
                </ul>

                <div className="flex gap-2">
                    <span className="text-[9px] font-bold bg-teal-50 text-[#00A5A4] px-3 py-1.5 rounded uppercase">Free Shipping</span>
                    <span className="text-[9px] font-bold bg-teal-50 text-[#00A5A4] px-3 py-1.5 rounded uppercase">Free Gift</span>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-6">
                    <div className="text-[10px] font-bold text-gray-800 w-24 leading-tight uppercase">
                        Hurry Up! <br/> Promotion will expires in
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-gray-100 p-2 rounded-lg w-12 text-center">
                            <div className="text-lg font-bold">-162</div><div className="text-[8px] text-gray-400 font-bold uppercase">d</div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg w-10 text-center">
                            <div className="text-lg font-bold">9<span className="text-[8px] ml-0.5">h</span></div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg w-10 text-center">
                            <div className="text-lg font-bold">2<span className="text-[8px] ml-0.5">m</span></div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg w-10 text-center">
                            <div className="text-lg font-bold">4<span className="text-[8px] ml-0.5">s</span></div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 max-w-sm">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#00A5A4] h-full w-1/3"></div>
                    </div>
                    <p className="text-[11px] mt-2 font-bold text-gray-700">Sold: <span className="text-gray-400">26/75</span></p>
                </div>
            </div>
        </div>
        
    </div>
    
      </>
    )
}