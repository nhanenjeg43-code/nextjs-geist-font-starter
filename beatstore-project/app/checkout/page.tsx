"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const dropboxLink = "https://www.dropbox.com/s/example/product-download?raw=1"

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-12 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-8">Thank you for your purchase. You can download your product from the link below.</p>
        <a href={dropboxLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
          Download Product
        </a>
        <button onClick={() => router.push('/beats')} className="mt-6 px-4 py-2 bg-blue-600 rounded text-white">
          Back to Beats
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-12 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Checkout</h1>
      <button onClick={handlePayment} disabled={isProcessing} className="px-6 py-3 bg-blue-600 rounded text-white">
        {isProcessing ? "Processing Payment..." : "Pay Now"}
      </button>
    </main>
  )
}
