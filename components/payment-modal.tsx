"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Shield, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { type PricingTier, getLocalizedPrice } from "@/lib/pricing"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTier: PricingTier | null
  isYearly: boolean
  country: string
}

export function PaymentModal({ isOpen, onClose, selectedTier, isYearly, country }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "paystack">("paypal")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    organization: "",
  })

  if (!selectedTier) return null

  const localPrice = getLocalizedPrice(selectedTier, country)
  const finalPrice = isYearly ? Math.round(localPrice.amount * 10) : localPrice.amount
  const savings = isYearly ? Math.round(localPrice.amount * 2) : 0

  const handlePayPalPayment = async () => {
    try {
      // Create PayPal order
      const orderResponse = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPrice,
          currency: localPrice.currency,
          tierId: selectedTier.id,
          customerInfo,
          isYearly,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create PayPal order")
      }

      // Redirect to PayPal for approval
      if (orderData.approvalUrl) {
        window.location.href = orderData.approvalUrl
      } else {
        throw new Error("No approval URL received from PayPal")
      }
    } catch (error) {
      console.error("PayPal payment error:", error)
      setPaymentError(error instanceof Error ? error.message : "PayPal payment failed")
    }
  }

  const handlePaystackPayment = async () => {
    try {
      // Initialize Paystack transaction
      const initResponse = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPrice,
          currency: localPrice.currency,
          tierId: selectedTier.id,
          customerInfo,
          isYearly,
        }),
      })

      const initData = await initResponse.json()

      if (!initData.success) {
        throw new Error(initData.error || "Failed to initialize Paystack transaction")
      }

      // Redirect to Paystack for payment
      if (initData.authorizationUrl) {
        window.location.href = initData.authorizationUrl
      } else {
        throw new Error("No authorization URL received from Paystack")
      }
    } catch (error) {
      console.error("Paystack payment error:", error)
      setPaymentError(error instanceof Error ? error.message : "Paystack payment failed")
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentError(null)

    try {
      if (paymentMethod === "paypal") {
        await handlePayPalPayment()
      } else {
        await handlePaystackPayment()
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      setPaymentError("Payment processing failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const isFormValid = customerInfo.email && customerInfo.name && customerInfo.email.includes("@")

  if (paymentSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">
              Welcome to WildVenture Hub {selectedTier.name}! Your conservation journey begins now.
            </p>
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
              Access Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Complete Your Subscription
          </DialogTitle>
          <DialogDescription>
            Join thousands of conservationists making a real impact with WildSpeak AI
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{selectedTier.name}</h4>
                  <p className="text-sm text-gray-600">{selectedTier.description}</p>
                  {selectedTier.popular && <Badge className="mt-1 bg-blue-100 text-blue-800">Most Popular</Badge>}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{isYearly ? "Annual" : "Monthly"} Subscription</span>
                  <span>
                    {localPrice.currency} {finalPrice.toLocaleString()}
                  </span>
                </div>
                {isYearly && savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Annual Savings</span>
                    <span>
                      -{localPrice.currency} {savings.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>14-day free trial</span>
                  <span>Free</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  {localPrice.currency} {finalPrice.toLocaleString()}
                </span>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Your trial starts immediately. You won't be charged until after 14 days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <Input
                    id="organization"
                    value={customerInfo.organization}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, organization: e.target.value }))}
                    placeholder="Wildlife Conservation Society"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment provider</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: "paypal" | "paystack") => setPaymentMethod(value)}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PP</span>
                          </div>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-gray-600">Global payments, buyer protection</p>
                          </div>
                        </div>
                        <Badge variant="outline">Recommended</Badge>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="paystack" id="paystack" />
                    <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PS</span>
                          </div>
                          <div>
                            <p className="font-medium">Paystack</p>
                            <p className="text-sm text-gray-600">African payments, mobile money</p>
                          </div>
                        </div>
                        {["KE", "NG", "GH", "ZA"].includes(country) && (
                          <Badge className="bg-green-100 text-green-800">Local</Badge>
                        )}
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Error Display */}
            {paymentError && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900">Payment Error</h4>
                      <p className="text-sm text-red-800 mt-1">{paymentError}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !isFormValid}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Continue to {paymentMethod === "paypal" ? "PayPal" : "Paystack"}
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
              <p className="mt-1">Cancel anytime during your trial period.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
