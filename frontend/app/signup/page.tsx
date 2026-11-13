"use client";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Account created! Now login");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch { alert("Cannot reach Render backend"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8">
        <div className="text-center"><div className="text-4xl">🌿</div><h1 className="text-2xl font-extrabold mt-2">Create Account</h1></div>
        <div className="mt-8 space-y-4">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 rounded-full border bg-zinc-50" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-full border bg-zinc-50" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full border bg-zinc-50" />
          <button onClick={handleSignup} disabled={loading} className="w-full bg-black text-white py-3 rounded-full font-bold">{loading ? "Creating..." : "Sign Up"}</button>
        </div>
        <p className="text-center text-sm mt-6">Have account? <a href="/login" className="font-bold">Login</a></p>
      </div>
    </div>
  )
}
