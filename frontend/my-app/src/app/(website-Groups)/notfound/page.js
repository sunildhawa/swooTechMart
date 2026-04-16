import Link from 'next/link';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon & Error Code */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-9xl font-extrabold text-slate-200 leading-none mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Rasta kho gaya hai!
        </h2>
        
        <p className="text-slate-600 mb-8 text-lg">
          Maaf kijiye, jo page aap dhoond rahe hain wo shayad delete ho gaya hai ya galat URL hai.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            <Home size={18} />
            Home Par Jayein
          </Link>
          
          <Link 
            href="/contact" 
            className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all"
          >
            Support se Baat Karein
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
          <p>Kya aap search karna chahte hain? Humari <Link href="/sitemap" className="text-blue-500 underline">Site Map</Link> dekhein.</p>
        </div>
      </div>
    </div>
  );
}