import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/website/Global/Header";
import Footer from "@/components/website/Global/Footer";
import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SWOO - Tech Mart",
  description: "Your one stop tech shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f3f4f6]`}>
        <StoreProvider>
          <Toaster position="top-right" />
          <Header /> 
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}