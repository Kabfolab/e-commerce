"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");
  
  useEffect(() => {
    const reference = searchParams.get("reference");
    
    if (!reference) {
      setStatus("No reference found");
      return;
    }

    const verify = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        // Calls your Django backend: /api/orders/verify/<reference>/
        const res = await axios.get(`${API_URL}/orders/verify/${reference}/`);
        
        setStatus("Payment successful! ✅");
        setTimeout(() => {
          router.push("/orders/success");
        }, 2000);

      } catch (err) {
        console.error(err);
        setStatus("Payment verification failed ❌");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{status}</h1>
      <p className="mt-2 text-gray-500">Please wait...</p>
    </div>
  );
}
