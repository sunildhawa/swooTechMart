"use client";

import { useState } from "react";
import { notify } from "@/utils/apiHealpers";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  // States for settings
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    siteName: "My Platform",
  });

  const handleSave = () => {
    setLoading(true);
    // Yahan api call aayegi
    setTimeout(() => {
      setLoading(false);
      notify("Settings updated successfully", true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "general" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "security" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "notifications" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Notifications
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-700">General Settings</h2>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Site Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={profile.siteName}
                        onChange={(e) => setProfile({...profile, siteName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Admin Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={profile.email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-700">Security Settings</h2>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100 mt-4">
                      <div>
                        <p className="text-sm font-semibold text-red-800">Two-Factor Authentication</p>
                        <p className="text-xs text-red-600">Secure your account with 2FA</p>
                      </div>
                      <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md">Enable</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-700">Preferences</h2>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-600">Email notifications on new user registration</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Weekly analytics report</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-10 pt-6 border-t flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}