export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="relative overflow-hidden rounded-[2rem] m-2">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200" alt="Nature" className="w-full h-[70vh] object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">Power of Nature Healing 🌿</h1>
          <p className="mt-4 text-lg max-w-xl text-white/90">100% natural healing products, herbs, oils and organic supplements. Trusted by 2,000+ customers.</p>
          <div className="mt-6 flex gap-4">
            <a href="/shop" className="bg-white text-black px-6 py-3 rounded-full font-bold no-underline">Shop Now</a>
            <a href="/login" className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold no-underline">Login / Sign Up</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="text-2xl">🌱</div><p className="mt-2 font-bold text-sm">100% Natural</p></div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="text-2xl">🚚</div><p className="mt-2 font-bold text-sm">Fast Delivery</p></div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="text-2xl">💚</div><p className="mt-2 font-bold text-sm">Trusted Healing</p></div>
      </div>
      <div className="mt-16 bg-zinc-900 text-white p-8 rounded-t-[2rem]">
        <h2 className="font-bold text-xl">🌿 Power of Nature Healing</h2>
        <p className="text-zinc-400 mt-2">WhatsApp: +234 803 648 3048</p>
      </div>
    </div>
  )
}
