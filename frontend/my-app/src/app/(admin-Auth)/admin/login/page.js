"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosAPIinstance, notify } from "@/utils/apiHealpers";
import { FiLock, FiMail, FiLoader, FiShield } from "react-icons/fi";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify("All fields are required!", false);
      return;
    }

    setLoading(true);

    try {
      const res = await axiosAPIinstance.post("admin/login", { email, password });

      // Check if response exists and indicates success
      if (!res?.data?.success) {
        notify(res?.data?.message || "Login failed", false);
        setLoading(false);
        return;
      }

      const { admin, token } = res.data.data;

      // Validation for admin role
      if (admin?.role !== "admin") {
        notify("Access Restricted: Admins Only!", false);
        setLoading(false);
        return;
      }

      // ✅ SUCCESS PHASE
      setLoading(false);
      setIsSuccess(true);

      // Save credentials
      localStorage.setItem("admin_admin", JSON.stringify(admin));
      localStorage.setItem("admin_token", token);
      document.cookie = `token=${token}; path=/; SameSite=Lax`; // Secure cookie path

      // Delay for the "Cool Animation"
      setTimeout(() => {
        notify("Login Successful!", true);
        router.push("/admin");
      }, 1500);

    } catch (err) {
      setLoading(false);
      console.error("Login Error:", err);
      
      // Safeguard against network errors where err.response is undefined
      const errorMsg = err.response?.data?.message || "Server connection failed";
      notify(errorMsg, false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fd] px-4 relative overflow-hidden">
      
      {/* 🌟 LOGIN SUCCESS OVERLAY */}
      {isSuccess && (
        <div className="fixed inset-0 z-[999] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-100 border-t-[#ff7b00] rounded-full animate-spin"></div>
            <FiShield className="absolute inset-0 m-auto text-[#ff7b00]" size={30} />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-800 animate-pulse">Initializing Dashboard...</h2>
          <p className="text-gray-500 mt-2">Welcome back, Admin</p>
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orange-50 text-[#ff7b00] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FiShield size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Admin<span className="text-[#ff7b00]">Portal</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Secure access to your command center</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@dashboard.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-[#ff7b00] outline-none transition-all font-medium text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-[#ff7b00] outline-none transition-all font-medium text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg mt-4 flex items-center justify-center gap-2
                ${loading || isSuccess
                  ? "bg-gray-300 cursor-not-allowed shadow-none" 
                  : "bg-gray-900 hover:bg-[#ff7b00] active:scale-[0.98] shadow-orange-100"
                }`}
            >
              {loading ? (
                <><FiLoader className="animate-spin" /> Verifying...</>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-300 mt-10 uppercase tracking-[0.2em] font-bold">
            Cloud Security Verified
          </p>
        </div>
      </div>
    </div>
  );
}