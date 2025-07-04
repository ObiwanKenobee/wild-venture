"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      const paypalOrderId = searchParams.get("token")
      const paystackReference = searchParams.get("reference")

      try {
        if (paypalOrderId) {
          // Verify PayPal payment
          const response = await fetch("/api/payments/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: paypalOrderId }),
          })
          const result = await response.json()
          setVerificationResult({ ...result, provider: "PayPal" })
        } else if (paystackReference) {
          // Verify Paystack payment
          const response = await fetch("/api/payments/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: paystackReference }),
          })
          const result = await response.json()
          setVerificationResult({ ...result, provider: "Paystack" })
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setVerificationResult({ success: false, error: "Verification failed" })
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verifying Payment</h3>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!verificationResult?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">✕</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-red-900">Payment Verification Failed</h3>
            <p className="text-red-700 mb-4">
              {verificationResult?.error || "We couldn't verify your payment. Please contact support."}
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-2xl text-green-900">Payment Successful!</CardTitle>
          <CardDescription className="text-lg">
            Welcome to WildVenture Hub! Your conservation journey begins now.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Payment Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Provider:</span>
                <span className="ml-2 font-medium">{verificationResult.provider}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium text-green-600">Confirmed</span>
              </div>
              <div>
                <span className="text-gray-600">Reference:</span>
                <span className="ml-2 font-medium">{verificationResult.reference || verificationResult.orderId}</span>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <span className="ml-2 font-medium">{verificationResult.amount || "Confirmed"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">What's Next?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Your 14-day free trial has started
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Access to WildSpeak AI is now active
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Confirmation email sent to your inbox
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Full access to conservation experiences
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
              <Link href="/dashboard">
                Access Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
