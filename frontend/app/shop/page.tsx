"use client";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(r => r.json())
      .then(data => setProducts(data.products || data))
      .catch(() => setProducts([
        { _id: "1", name: "Moringa Powder", price: 5000, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
        { _id: "2", name: "Neem Oil", price: 3500, image: "https://images.unsplash.com/photo-1608571423902-eed4a94d8108?w=400" },
        { _id: "3", name: "Black Seed Oil", price: 8000, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
      ]));
  }, []);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-extrabold">🌿 Shop Products</h1>
          <a href="/cart" className="bg-black text-white px-6 py-2 rounded-full font-bold no-underline">Cart 🛒</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-white rounded-[1.5rem] p-4 shadow-sm">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-xl" />
              <h3 className="font-bold mt-3">{p.name}</h3>
              <p className="text-zinc-500 text-sm">₦{p.price?.toLocaleString()}</p>
              <button onClick={() => addToCart(p)} className="w-full mt-3 bg-black text-white py-2 rounded-full font-bold text-sm">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
