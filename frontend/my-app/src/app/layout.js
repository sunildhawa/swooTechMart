import { Toaster } from "react-hot-toast"; // ✅ Toaster import karein
import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Next.js Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-slate-900" suppressHydrationWarning={true}>
        {/* ✅ Toaster yahan rakhein */}
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}