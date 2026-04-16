"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // LocalStorage se user data nikalna (Login ke waqt save kiya gaya tha)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // Agar user login nahi hai, toh login page par bhej dein
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden md:max-w-2xl">
        
        {/* Top Header Section */}
        <div className="bg-teal-600 h-32 flex items-center justify-center relative">
          <h2 className="text-white text-2xl font-bold">My Account</h2>
        </div>

        <div className="relative px-8 pt-16 pb-8">
          {/* Profile Image - Absolute positioned */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
              {user?.image ? (
                <img 
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/category/${user.image}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-teal-600">
                  {user?.name?.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* User Basic Info */}
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-900">{user?.name}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <div className="mt-2 flex justify-center gap-2">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full uppercase">
                {user?.role || 'Customer'}
              </span>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="border-b border-gray-100 pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase">User ID</label>
              <p className="text-gray-800 font-medium truncate">{user?._id}</p>
            </div>
            
            <div className="border-b border-gray-100 pb-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Account Status</label>
              <p className="text-green-600 font-bold">Active</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-100">
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 bg-red-50 text-red-600 border border-red-100 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;