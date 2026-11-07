'use client';
import { useState, useEffect } from 'react';
import { createProduct, getProducts, deleteProduct, Product } from '@/lib/api';

export default function AdminPage() {
  const [form, setForm] = useState({ name: '', price: '', description: '', image_url: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetch = () => getProducts().then(r => setProducts(r.data));
  useEffect(()=> { fetch() }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await createProduct(form);
      setForm({ name: '', price: '', description: '', image_url: '' });
      fetch();
      alert('Product uploaded!');
    } catch(err) { alert('Failed - check backend is running'); }
    setUploading(false);
  }

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-8">
      <div className="bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight">Upload Product</h2>
        <p className="text-sm text-zinc-500 mt-1">This is your admin panel - uploads directly to Django API</p>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input required placeholder="Product Name" className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black" value={form.name} onChange={e=> setForm({...form, name: e.target.value})} />
          <input required type="number" step="0.01" placeholder="Price (₦)" className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black" value={form.price} onChange={e=> setForm({...form, price: e.target.value})} />
          <input required placeholder="Image URL (https://...)" className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black" value={form.image_url} onChange={e=> setForm({...form, image_url: e.target.value})} />
          <textarea required placeholder="Description" rows={4} className="w-full bg-zinc-50 border border-zinc-200 rounded-[20px] px-5 py-3.5 text-sm outline-none focus:border-black" value={form.description} onChange={e=> setForm({...form, description: e.target.value})} />
          <button disabled={uploading} className="w-full bg-black text-white rounded-full py-4 text-sm font-semibold hover:bg-zinc-800 disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Publish Product'}
          </button>
        </form>

        {form.image_url && (
          <div className="mt-6">
            <p className="text-xs font-medium text-zinc-500 mb-2">Preview:</p>
            <img src={form.image_url} className="w-full h-64 object-cover rounded-[20px] bg-zinc-100" alt="preview"/>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-bold">Recent ({products.length})</h3>
        {products.map(p=> (
          <div key={p.id} className="bg-white p-3 rounded-2xl border flex gap-3 items-center">
            <img src={p.image_url} className="w-14 h-14 rounded-xl object-cover bg-zinc-100"/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{p.name}</p>
              <p className="text-xs text-zinc-500">₦{Number(p.price).toLocaleString()}</p>
            </div>
            <button onClick={async()=> { if(confirm('Delete?')){ await deleteProduct(p.id); fetch(); } }} className="text-xs text-red-500 hover:text-red-700 px-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
