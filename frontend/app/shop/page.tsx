"use client";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Always /api/ - same as login, via next.config.js proxy
    fetch("/api/products/")
      .then(async (r) => {
        if (!r.ok) throw new Error(`Backend ${r.status} - ${(await r.text()).slice(0, 200)}`);
        const data = await r.json();
        setProducts(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        setError(err.message);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getImage = (p: any) => {
    // Django returns /media/products/xxx.jpg - proxy in next.config.js handles it
    return p.image_display_url || p.image || p.image_url || "";
  };

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // If same product already in cart, increase qty instead of duplicate
    const existing = cart.find((c: any) => c.id === product.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: getImage(product), qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="min-h-screen p-8 text-center">Loading real products from backend...</div>;
  if (error) return <div className="min-h-screen p-8 text-center"><h1 className="text-2xl font-bold">Shop - Backend Error</h1><p className="mt-2 text-red-500 text-sm bg-red-50 p-4 rounded-xl">{error}</p><p className="mt-4 text-sm text-zinc-500">1. Open /api/products/ in new tab - if it loads, Render is awake.<br/>2. Check next.config.js has /api rewrite.</p></div>;

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-extrabold">🌿 Shop Products</h1>
          <a href="/cart" className="bg-black text-white px-6 py-2 rounded-full font-bold no-underline">Cart 🛒</a>
        </div>
        {products.length === 0 ? (
          <div className="bg-white rounded-[1.5rem] p-12 text-center">
            <p className="font-bold">No products yet</p>
            <p className="text-zinc-500 text-sm mt-2">Upload one from Admin page with Choose File, then refresh.</p>
            <a href="/admin" className="inline-block mt-4 bg-black text-white px-6 py-3 rounded-full text-sm font-bold">Go to Admin Upload</a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-[1.5rem] p-4 shadow-sm">
                {getImage(p) ? <img src={getImage(p)} alt={p.name} className="w-full h-40 object-cover rounded-xl" /> : <div className="w-full h-40 bg-zinc-100 rounded-xl flex items-center justify-center text-sm text-zinc-400">No Image</div>}
                <h3 className="font-bold mt-3">{p.name}</h3>
                <p className="text-zinc-500 text-sm">₦{Number(p.price)?.toLocaleString()}</p>
                <button onClick={() => addToCart(p)} className="w-full mt-3 bg-black text-white py-2 rounded-full font-bold text-sm">Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
