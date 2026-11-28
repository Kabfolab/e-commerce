"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyContent() {
  const params = useSearchParams();
  const order = params.get("order");
  const amount = params.get("amount");
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-black">Order Placed! 🎉</h1>
      <p className="mt-4">Order #{order}</p>
      <p className="mt-2">Amount: ₦{Number(amount || 0).toLocaleString()}</p>
      <p className="mt-4 text-zinc-500 text-sm">We will contact you to confirm payment & delivery.</p>
      <a href="/shop" className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full">Back to Shop</a>
    </div>
  );
}

export default function VerifyPaymentPage() {
  return <Suspense><VerifyContent /></Suspense>;
}
