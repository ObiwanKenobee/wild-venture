import { type NextRequest, NextResponse } from "next/server"
import { paystackService } from "@/lib/paystack-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reference } = body

    if (!reference) {
      return NextResponse.json({ error: "Reference is required" }, { status: 400 })
    }

    // Verify the Paystack transaction
    const verification = await paystackService.verifyTransaction(reference)

    // Log successful verification
    console.log("Paystack transaction verified:", {
      reference,
      status: verification.status,
      amount: verification.amount,
      customer: verification.customer?.email,
    })

    // Here you would typically:
    // 1. Create user account or update subscription
    // 2. Send confirmation email
    // 3. Update database with payment info

    return NextResponse.json({
      success: true,
      reference,
      status: verification.status,
      amount: verification.amount / 100, // Convert back from kobo/cents
      customer: verification.customer,
      metadata: verification.metadata,
    })
  } catch (error) {
    console.error("Paystack verification error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to verify Paystack transaction" },
      { status: 500 },
    )
  }
}
