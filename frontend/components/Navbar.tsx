import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter">HWN</Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:opacity-60">Store</Link>
          <Link href="/admin" className="bg-black text-white px-4 py-2 rounded-full hover:bg-zinc-800">Admin Upload</Link>
        </div>
      </div>
    </nav>
  )
}
