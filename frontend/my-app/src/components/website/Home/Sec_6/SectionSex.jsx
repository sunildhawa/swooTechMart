export default function SectionSix() {
  return (
 

/* ================== CARD ================== */

  <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div className="bg-white rounded-[35px] border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Audios & Cameras</h2>
            <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-teal-500 uppercase">View All</a>
        </div>
        <div className="bg-[#2B3964] rounded-2xl p-5 mb-8 relative overflow-hidden h-[160px] flex items-center">
            <div className="z-10 text-white">
                <p className="text-[10px] font-bold opacity-70 mb-1">Best</p>
                <h4 className="text-lg font-bold leading-tight">Speaker <br/> 2023</h4>
            </div>
            <img src="https://m.media-amazon.com/images/I/71o6CU8MqVL._AC_UY327_FMwebp_QL65_.jpg" className="h-32 absolute right-[-10px] bottom-2 drop-shadow-2xl"/>
        </div>
        <div className="grid grid-cols-2 gap-y-10 text-center">
            <div className="group cursor-pointer">
                <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                    <img src="https://m.media-amazon.com/images/I/51O5FBgvdKL._AC_UY327_FMwebp_QL65_.jpg" className="h-12 object-contain"/>
                </div>
                <p className="text-xs font-bold text-gray-800">Speaker</p>
                <p className="text-[10px] text-gray-400">12 Items</p>
            </div>
            <div className="group cursor-pointer">
                <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                    <img src="https://m.media-amazon.com/images/I/717phiicRTL._AC_UY327_FMwebp_QL65_.jpg" className="h-12 object-contain"/>
                </div>
                <p className="text-xs font-bold text-gray-800">DSLR Camera</p>
                <p className="text-[10px] text-gray-400">9 Items</p>
            </div>
            <div className="group cursor-pointer">
                <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                    <img src="https://m.media-amazon.com/images/I/710T1sZiT7L._AC_UY327_FMwebp_QL65_.jpg" className="h-12 object-contain"/>
                </div>
                <p className="text-xs font-bold text-gray-800">Earbuds</p>
                <p className="text-[10px] text-gray-400">5 Items</p>
            </div>
            <div className="group cursor-pointer">
                <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                    <img src="https://m.media-amazon.com/images/I/61jRoRx6HiL._AC_SX416_CB1169409_QL70_.jpg" className="h-12 object-contain"/>
                </div>
                <p className="text-xs font-bold text-gray-800">Microphone</p>
                <p className="text-[10px] text-gray-400">12 Items</p>
            </div>
        </div>
    </div>

    <div className="bg-white rounded-[35px] border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Gaming</h2>
            <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-teal-500 uppercase">View All</a>
        </div>
        <div className="bg-[#E5E7EB] rounded-2xl p-5 mb-8 relative overflow-hidden h-[160px] flex items-center">
            <div className="z-10">
                <p className="text-[10px] font-black text-gray-900 tracking-tighter uppercase">Wireless</p>
                <h4 className="text-sm font-black text-gray-900 uppercase">RGB Gaming <br/> Mouse</h4>
            </div>
            <img src="https://m.media-amazon.com/images/I/51hZtBRUFBL._AC_SX416_CB1169409_QL70_.jpg" className="h-28 absolute right-0 bottom-2"/>
        </div>
        <div className="grid grid-cols-2 gap-y-10 text-center">
    {/* Monitors */}
    <div className="group cursor-pointer">
        <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
            <img 
                src="https://img.icons8.com/fluency/96/monitor--v1.png" 
                alt="Monitors"
                className="h-12 object-contain"
            />
        </div>
        <p className="text-xs font-bold text-gray-800">Monitors</p>
        <p className="text-[10px] text-gray-400">28 Items</p>
    </div>

    {/* Chair */}
    <div className="group cursor-pointer">
        <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
            <img 
                src="https://m.media-amazon.com/images/I/71PfyTreJIL._AC_UY327_FMwebp_QL65_.jpg" 
                alt="Chair"
                className="h-12 object-contain"
            />
        </div>
        <p className="text-xs font-bold text-gray-800">Chair</p>
        <p className="text-[10px] text-gray-400">12 Items</p>
    </div>

    {/* Controller */}
    <div className="group cursor-pointer">
        <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
            <img 
                src="https://img.icons8.com/fluency/96/controller.png" 
                alt="Controller"
                className="h-12 object-contain"
            />
        </div>
        <p className="text-xs font-bold text-gray-800">Controller</p>
        <p className="text-[10px] text-gray-400">9 Items</p>
    </div>

    {/* Keyboards */}
    <div className="group cursor-pointer">
        <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
            <img 
                src="https://img.icons8.com/fluency/96/keyboard.png" 
                alt="Keyboards"
                className="h-12 object-contain"
            />
        </div>
        <p className="text-xs font-bold text-gray-800">Keyboards</p>
        <p className="text-[10px] text-gray-400">30 Items</p>
    </div>
</div>
    </div>
     <div className="bg-white rounded-[35px] border border-gray-100 p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Office Equipments</h2>
        <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-teal-500 uppercase">View All</a>
    </div>

    {/* Featured Banner: Laser Projector */}
    <div className="bg-[#1A1A1A] rounded-2xl p-5 mb-8 relative overflow-hidden h-[160px] flex items-center justify-center text-center">
        <div className="z-10 text-white">
            <p className="text-[9px] font-medium opacity-60 uppercase tracking-tighter">Home Theater 4k</p>
            <h4 className="text-xl font-bold">Laser Projector</h4>
        </div>
        {/* Background Projector Image */}
        <img 
            src="https://img.icons8.com/fluency/240/video-projector.png" 
            className="h-28 absolute bottom-[-10px] right-[-10px] opacity-40 blur-[1px]" 
            alt="Projector BG"
        />
    </div>

    <div className="grid grid-cols-2 gap-y-10 text-center">
        {/* Printers */}
        <div className="group cursor-pointer">
            <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                <img 
                    src="https://m.media-amazon.com/images/I/5114ld0Vy4L._AC_UY327_FMwebp_QL65_.jpg" 
                    className="h-12 object-contain" 
                    alt="Printers"
                />
            </div>
            <p className="text-xs font-bold text-gray-800">Printers</p>
            <p className="text-[10px] text-gray-400">9 Items</p>
        </div>

        {/* Network (Router) */}
        <div className="group cursor-pointer">
            <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                <img 
                    src="https://img.icons8.com/fluency/96/router.png" 
                    className="h-12 object-contain" 
                    alt="Network"
                />
            </div>
            <p className="text-xs font-bold text-gray-800">Network</p>
            <p className="text-[10px] text-gray-400">90 Items</p>
        </div>

        {/* Security (CCTV) */}
        <div className="group cursor-pointer">
            <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                <img 
                    src="https://m.media-amazon.com/images/I/71e-Rlu8PdL._AC_UY327_FMwebp_QL65_.jpg" 
                    className="h-12 object-contain" 
                    alt="Security"
                />
            </div>
            <p className="text-xs font-bold text-gray-800">Security</p>
            <p className="text-[10px] text-gray-400">12 Items</p>
        </div>

        {/* Projectors */}
        <div className="group cursor-pointer">
            <div className="bg-gray-50 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-3 group-hover:bg-teal-50 transition">
                <img 
                    src="https://img.icons8.com/fluency/96/video-projector.png" 
                    className="h-12 object-contain" 
                    alt="Projectors"
                />
            </div>
            <p className="text-xs font-bold text-gray-800">Projectors</p>
            <p className="text-[10px] text-gray-400">12 Items</p>
        </div>
    </div>
</div>
</div>
  );
}
