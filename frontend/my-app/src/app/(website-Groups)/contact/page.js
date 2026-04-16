"use client";
import React, { useState, useRef } from "react";
import { EyeOff, Eye, Mail, Lock, User, Camera, ArrowRight, Loader2 } from "lucide-react";
import { axiosAPIinstance, notify } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      notify("Email and Password are required", false);
      setLoading(false);
      return;
    }

    try {
      let payload;
      let config = {};

      if (isLogin) {

        payload = {
          email: formData.email.trim(),
          password: formData.password,
        };

        config = {
          headers: { "Content-Type": "application/json" }
        };

      } else {

        payload = new FormData();
        payload.append("name", formData.name.trim());
        payload.append("email", formData.email.trim());
        payload.append("password", formData.password);

        if (formData.profilePic) {
          payload.append("profilePic", formData.profilePic);
        }

        config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
      }

      const endpoint = isLogin ? "user/login" : "user/create";

      const response = await axiosAPIinstance.post(endpoint, payload, config);

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data) {

        notify(isLogin ? "Login Successful!" : "Account Created Successfully!", true);

      

        if (isLogin) {

          const token = response.data?.data?.token;
          const user = response.data?.data?.user;

          if (token) {
            localStorage.setItem("token", token);
          }

          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
          }


          window.dispatchEvent(new Event("storage"));

          router.push("/products");

        } else {

          router.push("/products"); 
        }

      }

    } catch (err) {

      console.error("Auth Error:", err.response?.data || err.message);

      const errorMsg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      notify(errorMsg, false);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F4] p-4 md:p-10">
      <div className="bg-white w-full max-w-5xl flex flex-col md:flex-row rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px]">

        
        {/* LEFT SIDE: Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-[#00A896] relative items-center justify-center p-12 text-white">
          <div className="relative z-10 text-center flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Start Your Journey</h1>
            <p className="text-teal-50 opacity-90 text-lg mb-10">
              {isLogin
                ? "Join thousands of users and manage your shopping cart effortlessly."
                : "Create an account to unlock exclusive deals and personalized features."}
            </p>

            {/* Shopping Theme Image with matching vibes */}
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                alt="Online Shopping"
                className="w-full max-w-[380px] h-[300px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white/20 transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Floating badge for extra look */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black font-bold p-3 rounded-full shadow-lg animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        </div>

        {/* RIGHT SIDE: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                {isLogin ? "Sign In" : "Get Started"}
              </h2>
              <p className="text-gray-500 mt-2">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#00A896] transition-all overflow-hidden group"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-400">
                        <Camera size={24} className="mx-auto" />
                        <span className="text-[10px] font-medium">UPLOAD</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera size={20} className="text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <p className="text-xs text-gray-400 mt-2">Profile Picture (Optional)</p>
                </div>
              )}

              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#00A896] outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#00A896] outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#00A896] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00A896] text-white font-bold py-4 rounded-2xl hover:bg-[#008f80] transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : isLogin ? "Sign In" : "Create Account"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setImagePreview(null);
                    setFormData({ name: "", email: "", password: "", profilePic: null });
                  }}
                  className="ml-2 text-[#00A896] font-bold hover:underline"
                >
                  {isLogin ? "Register Now" : "Login Here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}