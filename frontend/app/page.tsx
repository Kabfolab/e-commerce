export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2rem] m-2">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200" alt="Nature" className="w-full h-[70vh] object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl">Power of Nature Healing 🌿</h1>
          <p className="mt-4 text-lg max-w-xl text-white/90 leading-relaxed">We provide 100% natural healing products, herbs, oils and organic supplements to restore your health naturally. No chemicals. No side effects. Trusted by over 2,000 customers across Nigeria.</p>
          <div className="mt-6 flex gap-4">
            <a href="/shop" className="bg-white text-black px-6 py-3 rounded-full font-bold no-underline">Shop Now</a>
            <a href="/login" className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold no-underline">Login / Sign Up</a>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="text-2xl">🌱</div><p className="mt-2 font-bold text-sm">100% Natural</p></div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="text-2xl">🚚</div><p className="mt-2 font-bold text-sm">Fast Delivery</p></div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="text-2xl">💚</div><p className="mt-2 font-bold text-sm">Trusted Healing</p></div>
      </div>

      {/* FOOTER - YOUR FULL FOOTER */}
      <footer className="mt-16 bg-[#0a0f0a] text-white p-8 md:p-12 rounded-t-[2rem]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <h2 className="text-2xl md:text-3xl font-bold">Power of Nature Healing</h2>
          </div>
          <p className="text-zinc-400 mt-4 leading-relaxed max-w-2xl">
            100% natural healing products, herbs, oils and organic supplements. No chemicals. Trusted by 2,000+ customers across Nigeria. Follow us everywhere.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="https://wa.me/2348036483048" className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center font-bold text-white no-underline">W</a>
            <a href="#" className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center font-bold text-white no-underline">f</a>
            <a href="#" className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center font-bold text-white no-underline">IG</a>
            <a href="#" className="w-14 h-14 rounded-full bg-black border border-zinc-700 flex items-center justify-center font-bold text-white no-underline">TT</a>
          </div>

          <h3 className="text-xl font-bold mt-12">Quick Links</h3>
          <div className="mt-4 space-y-3 text-zinc-400">
            <a href="/shop" className="block hover:text-white no-underline text-zinc-400">Shop</a>
            <a href="/cart" className="block hover:text-white no-underline text-zinc-400">Cart</a>
            <a href="/orders" className="block hover:text-white no-underline text-zinc-400">My Orders</a>
            <a href="/chat" className="block hover:text-white no-underline text-zinc-400">Chat Support</a>
          </div>

          <h3 className="text-xl font-bold mt-12">Connect With Us</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-sm">W</span>
              <span>WhatsApp: +234 803 648 3048</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-sm text-white">f</span>
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-sm text-white">IG</span>
              <span>Instagram</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm">TT</span>
              <span>TikTok</span>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-6 text-center text-zinc-500 text-sm">
            <p>© 2026 Power of Nature Healing. All rights reserved.</p>
            <p className="mt-2">Made with 💚 for natural healing • Follow us for health tips daily!</p>
          </div>
        </div>

        <a href="https://wa.me/2348036483048" className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl text-3xl no-underline">💬</a>
      </footer>
    </div>
  )
}
