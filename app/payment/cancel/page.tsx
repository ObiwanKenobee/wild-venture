import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <XCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-gray-900">Payment Cancelled</CardTitle>
          <CardDescription className="text-lg">
            Your payment was cancelled. No charges were made to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">What happened?</h4>
            <p className="text-sm text-orange-800">
              You cancelled the payment process before completion. Your subscription was not activated and no payment
              was processed.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Need Help?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Try a different payment method</li>
              <li>• Check your payment details</li>
              <li>• Contact our support team</li>
              <li>• Review our pricing options</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
              <Link href="/#pricing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Try Again
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/contact">
                <HelpCircle className="h-4 w-4 mr-2" />
                Get Help
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
