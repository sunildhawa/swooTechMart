"use client";
import React from 'react';
import Link from 'next/link';
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-12 md:pt-16 pb-6 border-t border-gray-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-20">

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 mb-12 md:mb-20">

          {/* Brand Info - Full width on small mobile */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-[14px] md:text-[15px] font-bold text-black mb-5 md:mb-7 uppercase tracking-tight">
              SWOO - 1ST NYC TECH ONLINE MARKET
            </h2>
            <div className="mb-6 md:mb-7">
              <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wide">Hotline 24/7</p>
              <p className="text-[20px] md:text-[24px] font-bold text-[#00A896] mt-1">(025) 3686 25 16</p>
            </div>
            <div className="text-[13px] text-gray-500 leading-relaxed mb-6 md:mb-7">
              257 Thatcher Road St, Brooklyn, Manhattan, <br className="hidden md:block" /> NY 10092 <br />
              <span className="text-black font-semibold">contact@Swootechmart.com</span>
            </div>
            {/* Social Icons */}
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

          {/* Categories Columns */}
          <FooterColumn title="Top Categories" links={['Laptops', 'PC & Computers', 'Cell Phones', 'Tablets', 'Gaming & VR', 'Networks', 'Cameras', 'Sounds', 'Office']} />
          <FooterColumn title="Company" links={['About Swoo', 'Contact', 'Career', 'Blog', 'Sitemap', 'Store Locations']} />
          <FooterColumn title="Help Center" links={['Customer Service', 'Policy', 'Terms & Conditions', 'Trach Order', 'FAQs', 'My Account', 'Product Support']} />
          <FooterColumn title="Partner" links={['Become Seller', 'Affiliate', 'Advertise', 'Partnership']} />
        </div>

        {/* Middle Section: Language & Subscription */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-10 py-10 border-t border-gray-100">
          <div className="flex gap-4 order-2 lg:order-1">
            <div className="border border-gray-100 rounded-lg px-4 py-2 text-[12px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer shadow-sm bg-white">
              USD <span className="text-[8px] text-gray-400">▼</span>
            </div>
            <div className="border border-gray-100 rounded-lg px-4 py-2 text-[12px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer shadow-sm bg-white">
              🇺🇸 Eng <span className="text-[8px] text-gray-400">▼</span>
            </div>
          </div>

          <div className="flex-1 max-w-[700px] w-full text-center lg:text-left order-1 lg:order-2">
            <h4 className="text-[13px] md:text-[15px] font-bold uppercase mb-4 tracking-tight">
              SUBSCRIBE & GET <span className="text-[#FF6B6B] ml-1">10% OFF</span> FOR YOUR FIRST ORDER
            </h4>
            <div className="relative border-b-2 border-gray-100 flex items-center pb-2">
              <input
                type="text"
                placeholder="Enter your email address"
                className="w-full text-sm outline-none bg-transparent placeholder:text-gray-300 py-2"
              />
              <button className="text-[12px] md:text-[13px] font-bold text-[#00A896] uppercase tracking-widest ml-4 hover:text-black transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] md:text-[11px] text-gray-400 mt-4 italic">
              By subscribing, you&apos;re accepted the our <span className="underline cursor-pointer hover:text-black">Policy</span>
            </p>
          </div>
        </div>


        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[12px] text-gray-400 font-medium text-center md:text-left">
            © 2024 <span className="text-black font-bold">Sunil Dhawan</span>. All Rights Reserved
          </p>

          {/* Payment Icons */}
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-8 grayscale opacity-60">
            <span className="text-blue-800 font-bold italic text-base md:text-lg">PayPal</span>
            <span className="text-orange-600 font-bold tracking-tighter text-sm md:text-base">mastercard</span>
            <span className="text-blue-700 font-black text-lg md:text-xl italic">VISA</span>
            <span className="text-blue-400 font-bold text-base md:text-lg underline underline-offset-4">stripe</span>
            <span className="text-black font-black text-lg md:text-xl">Klarna.</span>
          </div>

          <Link href="#" className="text-[12px] font-bold text-[#00A896] hover:underline transition-all">
            Mobile Site
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="lg:pl-6 text-left">
      <h3 className="text-[13px] md:text-[14px] font-bold text-black mb-5 md:mb-7 uppercase tracking-tight">{title}</h3>
      <ul className="space-y-2.5 md:space-y-3.5 text-[12px] md:text-[13.5px] text-gray-500 font-medium">
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