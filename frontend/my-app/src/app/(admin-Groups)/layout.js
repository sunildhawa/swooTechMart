'use client';

import Sidebar from "@/components/admin/sidebar";
import HeaderAdmin from "@/components/admin/Header";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Toast Container */}
      <Toaster
        position="top-right"
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <HeaderAdmin />

        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
