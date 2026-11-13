"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => { setCart(JSON.parse(localStorage.getItem("cart") || "[]")); }, []);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] p-6 mt-8">
        <h1 className="text-2xl font-extrabold">Your Cart 🛒</h1>
        {cart.length === 0 ? <p className="mt-6 text-zinc-500">Cart is empty. <a href="/shop" className="font-bold text-black">Go Shop</a></p> : <>
          <div className="mt-6 space-y-3">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
                <span className="font-bold">{item.name}</span>
                <div className="flex gap-3 items-center"><span>₦{item.price}</span><button onClick={() => removeItem(i)} className="text-red-500 font-bold">X</button></div>
              </div>
            ))}
          </div>
          <div className="border-t mt-6 pt-4 flex justify-between font-extrabold text-lg"><span>Total:</span><span>₦{total.toLocaleString()}</span></div>
          <a href="/checkout" className="block w-full mt-6 bg-black text-white text-center py-3 rounded-full font-bold no-underline">Checkout</a>
        </>}
      </div>
    </div>
  )
}
