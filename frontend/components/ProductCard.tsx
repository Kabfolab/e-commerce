import { Product } from '@/lib/api';

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group bg-white rounded-[24px] p-3 border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
      <div className="aspect-[4/5] bg-zinc-100 rounded-[18px] overflow-hidden">
        {p.image_url ? (
          <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">No Image</div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold leading-tight">{p.name}</h3>
        <p className="text-sm text-zinc-500 line-clamp-2 mt-1">{p.description}</p>
        <p className="mt-3 font-bold">₦{Number(p.price).toLocaleString()}</p>
      </div>
    </div>
  )
}
