"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "https://e-commerce-svvy.onrender.com";

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log("Trying:", `${API}/api/auth/login/`);
      const res = await fetch(`${API}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // DO NOT add credentials: 'include' - it breaks CORS
      body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login SUCCESS!");
        window.location.href = "/";
      } else {
        alert("Server said: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      alert("REAL ERROR: " + err.message + "\n\nAPI URL is: " + API);
    }
    setLoading(false);
  };

  // THIS IS THE TEST BUTTON
  const testConnection = async () => {
    try {
      const res = await fetch(`${API}/api/products/`);
      const text = await res.text();
      alert("RENDER IS REACHABLE! Status: " + res.status + "\nFirst 100 chars: " + text.slice(0,100));
    } catch (e) {
      alert("TEST FAILED - CORS STILL BLOCKED:\n" + e.message);
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    alert("Signed out!");
    window.location.href = "/shop";
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8">
        <div className="text-center"><div className="text-4xl">🌿</div><h1 className="text-2xl font-extrabold mt-2">Welcome Back</h1>
        <p className="text-xs text-zinc-400 mt-1">API: {API}</p>
        </div>
        <div className="mt-8 space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-full border bg-zinc-50" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full border bg-zinc-50" />
          <button onClick={handleLogin} disabled={loading} className="w-full bg-black text-white py-3 rounded-full font-bold">{loading ? "Loading..." : "Login"}</button>
          
          <button onClick={testConnection} className="w-full bg-red-500 text-white py-3 rounded-full font-bold">🔴 TEST RENDER CONNECTION</button>
          
          <button onClick={handleSignOut} className="w-full bg-zinc-100 py-3 rounded-full font-bold">Sign Out</button>
        </div>
        <p className="text-center text-sm mt-6">No account? <a href="/signup" className="font-bold">Sign Up</a></p>
      </div>
    </div>
  )
}
