'use client';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data)).finally(()=> setLoading(false));
  }, []);

  if(loading) return <div className="py-20 text-center animate-pulse">Loading beautiful products...</div>

  return (
    <div>
      <div className="py-10">
        <h1 className="text-5xl font-black tracking-tighter leading-none">NEW<br/>ARRIVALS</h1>
        <p className="text-zinc-500 mt-3">Curated for you — {products.length} products</p>
      </div>
      {products.length === 0 ? (
        <div className="bg-white rounded-[24px] p-16 text-center border">No products yet. Go to Admin to upload.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}
