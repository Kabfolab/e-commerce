"use client"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("test123@gmail.com")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // FIX 1: Use /api/ (proxy) not full Render URL
      // FIX 2: Add / at end for Django
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      // FIX 3: Read as text first to avoid <!DOCTYPE crash
      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        alert("Backend error (check Render logs):\n" + text.slice(0, 800))
        setLoading(false)
        return
      }

      if (!res.ok) {
        alert(data.detail || data.message || "Login failed")
      } else {
        localStorage.setItem("access", data.access || "")
        localStorage.setItem("refresh", data.refresh || "")
        alert("Login successful!")
        window.location.href = "/"
      }
    } catch (err: any) {
      alert("REAL ERROR: " + err.message)
    }
    setLoading(false)
  }

  const testConnection = async () => {
    try {
      const res = await fetch("/api/auth/login/", { method: "GET" })
      if (res.status === 405) {
        alert("✅ RENDER IS REACHABLE! Backend is awake (405 is correct)")
      } else {
        const t = await res.text()
        alert(`Status ${res.status}: ${t.slice(0,300)}`)
      }
    } catch (err: any) {
      alert("Failed to fetch: " + err.message + "\nCheck next.config.js is svyy")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6 text-sm">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <button
          onClick={testConnection}
          className="w-full mt-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium"
        >
          🔴 TEST RENDER CONNECTION
        </button>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don't have an account? </span>
          <Link href="/signup" className="font-medium underline">Sign up</Link>
        </div>

        <button
          onClick={() => { localStorage.clear(); alert("Signed out") }}
          className="w-full mt-3 text-sm text-gray-400"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
