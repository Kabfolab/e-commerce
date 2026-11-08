"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass rounded-b-[1.5rem] mx-2 mt-2">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          🌿 Nature Store
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/shop" className="hidden md:block text-sm font-medium">
            Shop
          </Link>
          <Link href="/login" className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold">
            Login / Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
