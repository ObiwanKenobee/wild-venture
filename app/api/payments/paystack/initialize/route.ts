import { type NextRequest, NextResponse } from "next/server"
import { paystackService } from "@/lib/paystack-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, tierId, customerInfo, isYearly } = body

    // Validate required fields
    if (!amount || !currency || !tierId || !customerInfo?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate unique reference
    const reference = `WV_${tierId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Prepare metadata
    const metadata = {
      tier: tierId,
      billing_cycle: isYearly ? "yearly" : "monthly",
      customer_name: customerInfo.name,
      organization: customerInfo.organization || "",
    }

    // Initialize Paystack transaction
    const transaction = await paystackService.initializeTransaction(
      customerInfo.email,
      amount,
      currency,
      reference,
      metadata,
    )

    // Log the transaction initialization
    console.log("Paystack transaction initialized:", {
      reference: transaction.reference,
      tier: tierId,
      customer: customerInfo.email,
      amount: `${currency} ${amount}`,
      billing: isYearly ? "yearly" : "monthly",
    })

    return NextResponse.json({
      success: true,
      reference: transaction.reference,
      authorizationUrl: transaction.authorization_url,
      accessCode: transaction.access_code,
    })
  } catch (error) {
    console.error("Paystack initialization error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to initialize Paystack transaction" },
      { status: 500 },
    )
  }
}
