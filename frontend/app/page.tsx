"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f6fdf6] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f4d0f] text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>🌿</span> Nature Store
        </div>
        <Link href="/login" className="bg-white text-[#0f4d0f] px-6 py-2 rounded-lg font-semibold text-sm">
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-4 py-6">
        {/* Forest Image */}
        <div className="rounded-[28px] overflow-hidden h-[420px] w-full">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" 
            alt="Forest" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <div className="text-center mt-8">
          <h1 className="text-[32px] font-black leading-tight">
            Power of Nature<br/>Healing 🌿
          </h1>
          <p className="text-zinc-600 mt-4 text-[15px] leading-6 px-2">
            We provide 100% natural healing products, herbs, oils and organic supplements to restore your health naturally. No chemicals. No side effects. Trusted by over 2,000 customers across Nigeria.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center">
            <div className="text-2xl">🌱</div>
            <p className="font-bold text-sm mt-1">100%<br/>Natural</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center">
            <div className="text-2xl">🚚</div>
            <p className="font-bold text-sm mt-1">Fast<br/>Delivery</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center">
            <div className="text-2xl">💚</div>
            <p className="font-bold text-sm mt-1">Trusted<br/>Healing</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/login" className="block bg-[#0f4d0f] text-white text-center py-4 rounded-2xl font-bold mt-6">
          Get Started - Login / Sign Up
        </Link>
      </main>

      {/* Footer - Dark */}
      <footer className="bg-[#0a1a0a] text-white px-6 py-10 mt-10">
        <h2 className="text-2xl font-black flex items-center gap-2">
          🌿 Power of Nature Healing
        </h2>
        <p className="text-zinc-400 mt-4 text-sm leading-6">
          100% natural healing products, herbs, oils and organic supplements. No chemicals. Trusted by 2,000+ customers across Nigeria. Follow us everywhere.
        </p>

        {/* Social Circles */}
        <div className="flex gap-4 mt-6">
          <a href="https://wa.me/2348036483048" className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center font-bold">W</a>
          <a href="#" className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center font-bold">f</a>
          <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center font-bold">IG</a>
          <a href="#" className="w-12 h-12 rounded-full bg-black border border-zinc-700 flex items-center justify-center font-bold">TT</a>
        </div>

        <h3 className="font-bold text-lg mt-10">Quick Links</h3>
        <div className="mt-4 space-y-3 text-zinc-400">
          <Link href="/shop" className="block">Shop</Link>
          <Link href="/cart" className="block">Cart</Link>
          <Link href="/orders" className="block">My Orders</Link>
          <Link href="/support" className="block">Chat Support</Link>
        </div>

        <h3 className="font-bold text-lg mt-10">Connect With Us</h3>
        <div className="mt-4 space-y-3 text-zinc-400 text-sm">
          <p className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">W</span> WhatsApp: +234 803 648 3048</p>
          <p className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white">f</span> Facebook</p>
          <p className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white">IG</span> Instagram</p>
          <p className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">TT</span> TikTok</p>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-zinc-500 text-xs">
          <p>© 2026 Power of Nature Healing. All rights reserved.</p>
          <p className="mt-3">Made with 💚 for natural healing • Follow us for daily!</p>
        </div>
      </footer>

      {/* WhatsApp Floating */}
      <a href="https://wa.me/2348036483048" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl text-2xl">
        <span className="text-white">💬</span>
      </a>
    </div>
  );
}
