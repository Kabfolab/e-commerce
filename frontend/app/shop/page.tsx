"use client";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // FIX 1: NEXT_PUBLIC_API_URL already ends with /api, so don't add /api again
    // In Vercel, set it to: https://e-commerce-svvy.onrender.com/api
    const base = process.env.NEXT_PUBLIC_API_URL || "https://e-commerce-svvy.onrender.com/api";
    const url = `${base}/products/`;

    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(`Backend ${r.status} - ${await r.text()}`);
        const data = await r.json();
        // Django returns array directly: [] or [{...}]
        setProducts(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        // FIX 2: NO FAKE PRODUCTS - show real error so we can fix it
        console.log("Shop fetch failed:", err);
        setError(err.message);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getImage = (p: any) => {
    // FIX 3: Django ImageField returns /media/products/xxx.jpg
    // Need full backend URL
    let img = p.image_display_url || p.image || p.image_url || "";
    if (img.startsWith("/")) {
      const base = (process.env.NEXT_PUBLIC_API_URL || "https://e-commerce-svvy.onrender.com/api").replace("/api", "");
      return base + img;
    }
    return img;
  };

  const addToCart = (product: any) => {
    // Keep your localStorage cart - but save correct id
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, id: product.id, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="min-h-screen p-8 text-center">Loading real products from backend...</div>;

  if (error) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold">Shop - Backend Error</h1>
        <p className="mt-2 text-red-500 text-sm bg-red-50 p-4 rounded-xl">{error}</p>
        <p className="mt-4 text-sm text-zinc-500">Check: 1. Render is awake? Open /api/products/ in new tab first.<br/>2. Vercel NEXT_PUBLIC_API_URL = https://e-commerce-svvy.onrender.com/api</p>
        <a href="/cart" className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full font-bold">Go to Cart</a>
      </div>
    );
  }

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
                {getImage(p) ? (
                  <img src={getImage(p)} alt={p.name} className="w-full h-40 object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-40 bg-zinc-100 rounded-xl flex items-center justify-center text-sm text-zinc-400">No Image</div>
                )}
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
