"use client";
import React from 'react';
import Link from 'next/link';
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-6 border-t border-gray-100 font-sans">
      {/* Container with exact max-width and side padding to match your images */}
      <div className="max-w-[1400px] mx-auto px-10 xl:px-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h2 className="text-[15px] font-bold text-black mb-7 uppercase tracking-tight">
              SWOO - 1ST NYC TECH ONLINE MARKET
            </h2>
            <div className="mb-7">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Hotline 24/7</p>
              <p className="text-[24px] font-bold text-[#00A896] mt-1">(025) 3686 25 16</p>
            </div>
            <div className="text-[13px] text-gray-500 leading-relaxed mb-7">
              257 Thatcher Road St, Brooklyn, Manhattan, <br /> NY 10092 <br />
              <span className="text-black font-semibold">contact@Swootechmart.com</span>
            </div>
            {/* Social Icons with exact spacing */}
            <div className="flex gap-2.5">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 bg-[#F3F6F6] rounded-full flex items-center justify-center text-gray-500 hover:bg-[#00A896] hover:text-white cursor-pointer transition-all">
                  <Icon size={14} />
                </div>
              ))}
              <div className="w-8 h-8 bg-[#F3F6F6] rounded-full flex items-center justify-center text-gray-500 hover:bg-[#00A896] hover:text-white cursor-pointer">
                <span className="font-bold text-[13px]">P</span>
              </div>
            </div>
          </div>

          {/* Categories Columns - Clean Logic for .jsx */}
          <FooterColumn title="Top Categories" links={['Laptops', 'PC & Computers', 'Cell Phones', 'Tablets', 'Gaming & VR', 'Networks', 'Cameras', 'Sounds', 'Office']} />
          <FooterColumn title="Company" links={['About Swoo', 'Contact', 'Career', 'Blog', 'Sitemap', 'Store Locations']} />
          <FooterColumn title="Help Center" links={['Customer Service', 'Policy', 'Terms & Conditions', 'Trach Order', 'FAQs', 'My Account', 'Product Support']} />
          <FooterColumn title="Partner" links={['Become Seller', 'Affiliate', 'Advertise', 'Partnership']} />
        </div>

        {/* Middle Section: Language & Subscription */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 py-12 border-t border-gray-100">
          <div className="flex gap-4">
             <div className="border border-gray-100 rounded-lg px-4 py-2 text-[12px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer shadow-sm">
                USD <span className="text-[8px] text-gray-400">▼</span>
             </div>
             <div className="border border-gray-100 rounded-lg px-4 py-2 text-[12px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer shadow-sm">
                🇺🇸 Eng <span className="text-[8px] text-gray-400">▼</span>
             </div>
          </div>
          
          <div className="flex-1 max-w-[700px] w-full">
            <h4 className="text-[15px] font-bold uppercase mb-4 tracking-tight">
              SUBSCRIBE & GET <span className="text-[#FF6B6B] ml-1">10% OFF</span> FOR YOUR FIRST ORDER
            </h4>
            <div className="relative border-b-2 border-gray-100 flex items-center pb-3">
              <input 
                type="text" 
                placeholder="Enter your email address" 
                className="w-full text-sm outline-none bg-transparent placeholder:text-gray-300" 
              />
              <button className="text-[13px] font-bold text-[#00A896] uppercase tracking-widest ml-4 hover:text-black transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-4 italic">
              By subscribing, you&apos;re accepted the our <span className="underline cursor-pointer hover:text-black">Policy</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payments */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-gray-400 font-medium">
            © 2024 <span className="text-black font-bold">Shawonetc3</span>. All Rights Reserved
          </p>
          
          {/* Payment Icons aligned as per pic */}
          <div className="flex items-center gap-8 grayscale opacity-60">
            <span className="text-blue-800 font-bold italic text-lg">PayPal</span>
            <span className="text-orange-600 font-bold tracking-tighter">mastercard</span>
            <span className="text-blue-700 font-black text-xl italic">VISA</span>
            <span className="text-blue-400 font-bold text-lg underline underline-offset-4">stripe</span>
            <span className="text-black font-black text-xl">Klarna.</span>
          </div>

          <Link href="#" className="text-[12px] font-bold text-[#00A896] hover:underline transition-all">
            Mobile Site
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Helper component fixed for JavaScript (.jsx) - No TypeScript syntax
function FooterColumn({ title, links }) {
  return (
    <div className="lg:pl-6">
      <h3 className="text-[14px] font-bold text-black mb-7 uppercase tracking-tight">{title}</h3>
      <ul className="space-y-3.5 text-[13.5px] text-gray-500 font-medium">
        {links.map((link, i) => (
          <li key={i}>
            <Link href="#" className="hover:text-[#00A896] transition-all duration-200">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}