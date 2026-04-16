"use client"
import React, { useState } from 'react';

const MapSection = () => {
    // Dynamic Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'United States (US)',
        subject: '',
        message: '',
        agreed: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Message Sent Successfully!");
    };

    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Container: Flexbox used for Side-by-Side layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    
                    {/* LEFT SIDE: DYNAMIC FORM */}
                    <div className="w-full lg:w-5/12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                            <p className="text-gray-500 mt-2">Fill out the form and we'll get back to you.</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="First Name *"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none transition-all"
                                />
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Last Name *"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none transition-all"
                                />
                            </div>

                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email Address *"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none transition-all"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone (Optional)"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none transition-all"
                                />
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer"
                                >
                                    <option>United States (US)</option>
                                    <option>United Kingdom (UK)</option>
                                    <option>India (IN)</option>
                                </select>
                            </div>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none transition-all h-40 resize-none"
                            />

                            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="agreed"
                                    checked={formData.agreed}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-teal-600 rounded" 
                                />
                                <span>I agree to the Terms & Conditions</span>
                            </label>

                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transform active:scale-95 transition-all"
                            >
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SIDE: DYNAMIC HIGH-MAP */}
                    <div className="w-full lg:w-7/12 min-h-[500px] lg:min-h-full">
                        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            {/* Overlay info (Optional) */}
                            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-md hidden sm:block">
                                <h4 className="font-bold text-gray-800">Our Office</h4>
                                <p className="text-xs text-gray-600">123 Business Avenue, NY</p>
                            </div>
                            
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.9878436!3d40.7579747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x5119f8741cc887bc!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625500000000"
                                width="100%"
                                height="100%"
                                className="absolute inset-0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Map"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MapSection;