"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const testRender = async () => {
    setLoading(true)
    try {
      // Django needs POST, but we test with GET to check if reachable
      const res = await fetch("/api/auth/login/", {
        method: "GET",
      })
      const text = await res.text()
      // If we get 405, it means backend IS reachable!
      if (res.status === 405) {
        alert("RENDER IS REACHABLE! Status: 405 (correct, needs POST)")
      } else {
        alert(`RENDER response: ${res.status}\n${text.slice(0,300)}`)
      }
    } catch (e:any) {
      alert("REAL ERROR: " + e.message)
    }
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        alert("Backend returned HTML, not JSON. Backend says:\n" + text.slice(0,500))
        setLoading(false)
        return
      }

      if (!res.ok) {
        alert("Login failed: " + JSON.stringify(data))
      } else {
        alert("Login success! " + JSON.stringify(data))
        localStorage.setItem("token", data.access || data.token || "")
        window.location.href = "/"
      }
    } catch (e:any) {
      alert("REAL ERROR: " + e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1>Welcome Back</h1>
      <input 
        placeholder="Email" 
        value={email} 
        onChange={e=>setEmail(e.target.value)}
        style={{ width:"100%", padding:10, margin:"10px 0" }}
      />
      <input 
        placeholder="Password" 
        type="password"
        value={password} 
        onChange={e=>setPassword(e.target.value)}
        style={{ width:"100%", padding:10, margin:"10px 0" }}
      />
      <button 
        onClick={handleLogin}
        disabled={loading}
        style={{ width:"100%", padding:12, background:"black", color:"white", margin:"10px 0" }}
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <button 
        onClick={testRender}
        style={{ width:"100%", padding:12, background:"red", color:"white", margin:"10px 0" }}
      >
        🔴 TEST RENDER CONNECTION
      </button>

      <button onClick={()=>{localStorage.clear(); alert("Signed Out")}} style={{ width:"100%", padding:12 }}>
        Sign Out
      </button>
    </div>
  )
}
