"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    // Auto-fill email if saved from login/signup
    const savedEmail = localStorage.getItem("email") || localStorage.getItem("user_email") || "";
    if (savedEmail) setEmail(savedEmail);
  }, []);
  const total = cart.reduce((s, i) => s + Number(i.price) * (i.qty || 1), 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("access") || "";
      const res = await fetch("/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { "Authorization": `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          full_name: name,
          email: email, // <-- Now included
          phone,
          address,
          total,
          items: cart.map(i => ({ product: i.id, quantity: i.qty || 1, price: i.price }))
        }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Backend ${res.status}: ${text.slice(0, 300)}`);
      const order = JSON.parse(text);
      localStorage.setItem("cart", "[]");
      localStorage.setItem("email", email); // Save for next time
      router.push(`/verify-payment?order=${order.id}&amount=${total}`);
    } catch (err: any) { alert(err.message); }
    setLoading(false);
  };

  if (cart.length === 0) return <div className="p-8 text-center"><p>Cart empty</p><button onClick={() => router.push('/shop')} className="mt-4 bg-black text-white px-6 py-3 rounded-full">Shop</button></div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-black">CHECKOUT</h1>
      <p className="text-zinc-500 mt-1">{cart.length} items - Total: ₦{total.toLocaleString()}</p>
      <form onSubmit={handleCheckout} className="mt-6 bg-white rounded-[24px] p-6 border space-y-4">
        <input required placeholder="Full Name" className="w-full bg-zinc-50 border rounded-full px-5 py-3.5 text-sm outline-none" value={name} onChange={e => setName(e.target.value)} />
        <input required type="email" placeholder="Email Address e.g. test123@gmail.com" className="w-full bg-zinc-50 border rounded-full px-5 py-3.5 text-sm outline-none" value={email} onChange={e => setEmail(e.target.value)} />
        <input required placeholder="Phone e.g. 0803..." className="w-full bg-zinc-50 border rounded-full px-5 py-3.5 text-sm outline-none" value={phone} onChange={e => setPhone(e.target.value)} />
        <textarea required placeholder="Delivery Address" rows={3} className="w-full bg-zinc-50 border rounded-[20px] px-5 py-3.5 text-sm outline-none" value={address} onChange={e => setAddress(e.target.value)} />
        <button disabled={loading} className="w-full bg-black text-white rounded-full py-4 text-sm font-semibold">{loading ? 'Creating Order...' : `Pay ₦${total.toLocaleString()} - Place Order`}</button>
      </form>
    </div>
  );
}
