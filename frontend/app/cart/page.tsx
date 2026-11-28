"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const update = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, i) => sum + Number(i.price) * (i.qty || 1), 0);

  if (cart.length === 0) return <div className="min-h-screen p-8 text-center"><h1 className="text-2xl font-bold">Cart is empty</h1><button onClick={() => router.push('/shop')} className="mt-4 bg-black text-white px-6 py-3 rounded-full">Go to Shop</button></div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-black">Cart ({cart.length})</h1>
      <div className="space-y-3 mt-6">
        {cart.map((item: any, idx: number) => (
          <div key={idx} className="bg-white p-3 rounded-2xl border flex gap-3 items-center">
            {item.image && <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-zinc-100" alt="" />}
            <div className="flex-1"><p className="font-bold">{item.name}</p><p className="text-sm text-zinc-500">₦{Number(item.price).toLocaleString()}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={() => { const c = [...cart]; c[idx].qty = Math.max(1, (c[idx].qty || 1) - 1); update(c); }} className="w-8 h-8 border rounded-full">-</button>
              <span>{item.qty || 1}</span>
              <button onClick={() => { const c = [...cart]; c[idx].qty = (c[idx].qty || 1) + 1; update(c); }} className="w-8 h-8 border rounded-full">+</button>
            </div>
            <button onClick={() => update(cart.filter((_, i) => i !== idx))} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 mt-4 flex justify-between font-bold"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
      <button onClick={() => router.push('/checkout')} className="w-full mt-4 bg-black text-white py-4 rounded-full font-bold">Proceed to Checkout</button>
    </div>
  );
}
