

export default function SidePromoCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
           
    <div className="space-y-4">
        <div className="bg-gray-100 rounded-3xl h-[180px] relative overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=400" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
            <div className="absolute inset-0 bg-black/20 p-6 flex flex-col justify-between text-white">
                <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded w-fit">50%</span>
                <h4 className="font-bold text-lg leading-tight uppercase">Xbox <br/> Controller</h4>
            </div>
        </div>
        <div className="bg-gray-100 rounded-3xl h-[180px] relative overflow-hidden group cursor-pointer">
             <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
        <div className="bg-gray-100 rounded-3xl h-[180px] relative overflow-hidden group cursor-pointer">
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
    </div>
</div>
       
    )
}