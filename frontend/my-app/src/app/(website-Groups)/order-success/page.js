"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
    
    useEffect(() => {
        
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#00A896', '#000000', '#ffffff']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#00A896', '#000000', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Animated Icon */}
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-25"></div>
                    <div className="relative bg-teal-50 p-6 rounded-full">
                        <CheckCircle className="w-20 h-20 text-[#00A896]" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Order Placed!</h1>
                    <p className="text-slate-500 font-medium">
                        Thank you for shopping with us. Your order has been confirmed and will be delivered soon.
                    </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Order Status</span>
                        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase">Confirmed</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Delivery</span>
                        <span className="text-slate-900 font-bold">Standard (Free)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                    <Link href="/products">
                        <button className="w-full bg-[#00A896] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-teal-100 hover:scale-[1.02] transition-all">
                            Continue Shopping <ArrowRight size={20} />
                        </button>
                    </Link>
                    
                    <Link href="/viewOrder">
                        <button className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black border border-slate-200 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                            <ShoppingBag size={20} /> View My Orders
                        </button>
                    </Link>
                </div>

                <p className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em]">
                    Swoo Tech Mart • Secured Transaction
                </p>
            </div>
        </div>
    );
}