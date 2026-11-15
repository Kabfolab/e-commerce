'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function VerifyPaymentContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  // your existing code here...
  // keep all your return JSX inside this function

  return (
    <div>Verifying {reference}...</div>
  )
}

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <VerifyPaymentContent />
    </Suspense>
  )
}
