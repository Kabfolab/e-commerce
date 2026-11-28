'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [tab, setTab] = useState('ADD');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Only fields your model already has - no old_price, no category
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('100');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-svvy.onrender.com/api';

  const load = () => {
    fetch(`${API}/products/`).then(r => r.json()).then(d => setProducts(Array.isArray(d) ? d : []));
    fetch(`${API}/orders/`).then(r => r.json()).then(d => setOrders(Array.isArray(d) ? d : [])).catch(() => {});
  };
  useEffect(() => { load() }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
  };

  const getImage = (p: any) => {
    let img = p.image_display_url || p.image || p.image_url || '';
    if (img.startsWith('/')) return API.replace('/api', '') + img;
    return img;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please choose an image file');
    setUploading(true);

    const fd = new FormData();
    fd.append('name', name);
    fd.append('price', price);
    fd.append('stock', stock);
    fd.append('description', description);
    fd.append('is_featured', featured ? 'true' : 'false');
    fd.append('image', file);

    try {
      const res = await fetch(`${API}/products/`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      alert('Product published with image!');
      setName(''); setPrice(''); setStock('100'); setDescription(''); setFeatured(false); setFile(null); setPreview('');
      load();
      setTab('PRODUCTS');
    } catch (err: any) {
      alert('Failed: ' + err.message.slice(0, 200));
    }
    setUploading(false);
  };

  const inputCls = "w-full bg-white border border-zinc-200 rounded-full px-5 py-4 text-base outline-none focus:border-black";
  const tabCls = (t: string) => tab === t ? "bg-white text-black px-5 py-2 rounded-full font-bold" : "text-white/70 px-5 py-2 font-bold";

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="bg-[#0a2e1a] px-4 py-3 flex gap-2 overflow-x-auto sticky top-0">
        <button onClick={() => setTab('OVERVIEW')} className={tabCls('OVERVIEW')}>OVERVIEW</button>
        <button onClick={() => setTab('PRODUCTS')} className={tabCls('PRODUCTS')}>PRODUCTS</button>
        <button onClick={() => setTab('ORDERS')} className={tabCls('ORDERS')}>ORDERS</button>
        <button onClick={() => setTab('ADD')} className={tabCls('ADD')}>ADD</button>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        {tab === 'OVERVIEW' && (
          <div>
            <h1 className="text-4xl font-black">Good morning, Admin 🌿</h1>
            <p className="text-zinc-500 mt-1">Here&apos;s what&apos;s happening today.</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-3xl p-5"><p className="text-zinc-400 text-sm tracking-widest">TOTAL SALES</p><p className="text-3xl font-black mt-2">₦0</p></div>
              <div className="bg-white rounded-3xl p-5"><p className="text-zinc-400 text-sm tracking-widest">ORDERS</p><p className="text-3xl font-black mt-2">{orders.length}</p></div>
              <div className="bg-white rounded-3xl p-5"><p className="text-zinc-400 text-sm tracking-widest">PRODUCTS</p><p className="text-3xl font-black mt-2">{products.length}</p></div>
              <div className="bg-[#14532d] text-white rounded-3xl p-5"><p className="text-sm tracking-widest">STATUS</p><p className="text-2xl font-black mt-2">Live & Healthy ✅</p></div>
            </div>
          </div>
        )}

        {tab === 'PRODUCTS' && (
          <div className="space-y-3">
            <h1 className="text-3xl font-black">Products ({products.length})</h1>
            {products.map(p => (
              <div key={p.id} className="bg-white p-3 rounded-2xl border flex gap-3 items-center">
                <img src={getImage(p)} className="w-16 h-16 rounded-xl object-cover bg-zinc-100" alt="" />
                <div className="flex-1"><p className="font-bold">{p.name}</p><p className="text-sm text-zinc-500">₦{Number(p.price).toLocaleString()} • Stock: {p.stock ?? '—'}</p></div>
                <button onClick={async () => { if (confirm('Delete?')) { await fetch(`${API}/products/${p.id}/`, { method: 'DELETE' }); load(); } }} className="text-red-500 text-sm">Delete</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'ORDERS' && (
          <div className="bg-white rounded-3xl p-6">
            <h1 className="text-3xl font-black">Orders • Admin Inbox</h1>
            {orders.length === 0 && <p className="mt-6 text-zinc-400">No orders yet</p>}
            {orders.map((o: any) => <div key={o.id} className="border-t py-3 text-sm"><p className="font-bold">Order #{o.id} - ₦{Number(o.total).toLocaleString()}</p><p>{o.full_name} • {o.phone}</p><p className="text-zinc-500">{o.address}</p></div>)}
          </div>
        )}

        {tab === 'ADD' && (
          <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-6 space-y-4">
            <h1 className="text-4xl font-black">Add New Product</h1>
            <input required placeholder="Product Name e.g. Moringa Powder" className={inputCls} value={name} onChange={e => setName(e.target.value)} />
            <input required type="number" placeholder="Price ₦" className={inputCls} value={price} onChange={e => setPrice(e.target.value)} />
            {/* REMOVED: Old Price - deleted */}
            {/* REMOVED: Category - deleted */}
            <input type="number" placeholder="Stock" className={inputCls} value={stock} onChange={e => setStock(e.target.value)} />
            <textarea required placeholder="Full Description - benefits, how to use..." rows={4} className="w-full bg-white border border-zinc-200 rounded-[20px] px-5 py-4 outline-none" value={description} onChange={e => setDescription(e.target.value)} />
            <label className="flex items-center gap-2"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} /> Mark as Featured</label>

            <label className="block border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer">
              <span className="border px-3 py-1">{file ? `✅ ${file.name}` : 'Choose File'}</span>
              <span className="ml-2 text-zinc-500">{file ? '' : 'No file chosen'}</span>
              <span className="block text-sm text-zinc-400 mt-2">Upload clear product image (JPG/PNG)</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>

            {preview && <img src={preview} className="w-full h-64 object-cover rounded-[20px]" alt="preview" />}

            <button disabled={uploading} className="w-full bg-[#14532d] text-white rounded-full py-4 font-bold text-lg">
              {uploading ? 'Publishing...' : 'Publish Product 🌿'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
                }
