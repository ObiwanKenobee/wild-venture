import { type NextRequest, NextResponse } from "next/server"
import { paypalService } from "@/lib/paypal-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, tierId, customerInfo, isYearly } = body

    // Validate required fields
    if (!amount || !currency || !tierId || !customerInfo?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const description = `WildVenture Hub ${tierId} - ${isYearly ? "Annual" : "Monthly"} Subscription`

    // Create PayPal order
    const order = await paypalService.createOrder(amount, currency, description)

    // Log the order creation
    console.log("PayPal order created:", {
      orderId: order.id,
      tier: tierId,
      customer: customerInfo.email,
      amount: `${currency} ${amount}`,
      billing: isYearly ? "yearly" : "monthly",
    })

    // Find approval URL
    const approvalUrl = order.links.find((link) => link.rel === "approve")?.href

    return NextResponse.json({
      success: true,
      orderId: order.id,
      approvalUrl,
      status: order.status,
    })
  } catch (error) {
    console.error("PayPal order creation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create PayPal order" },
      { status: 500 },
    )
  }
}
