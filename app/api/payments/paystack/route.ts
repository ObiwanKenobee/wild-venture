import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, tierId, customerInfo, isYearly } = body

    // Paystack API integration would go here
    // This is a simplified example - in production, you'd use Paystack's API

    const paystackTransaction = {
      reference: `PAYSTACK_${Date.now()}`,
      authorization_url: `https://checkout.paystack.com/PAYSTACK_${Date.now()}`,
      access_code: `access_code_${Date.now()}`,
    }

    // Log the subscription creation
    console.log("Paystack subscription created:", {
      reference: paystackTransaction.reference,
      tier: tierId,
      customer: customerInfo.email,
      amount: `${currency} ${amount}`,
      billing: isYearly ? "yearly" : "monthly",
    })

    return NextResponse.json({
      success: true,
      reference: paystackTransaction.reference,
      authorizationUrl: paystackTransaction.authorization_url,
      accessCode: paystackTransaction.access_code,
    })
  } catch (error) {
    console.error("Paystack payment error:", error)
    return NextResponse.json({ error: "Failed to create Paystack transaction" }, { status: 500 })
  }
}
