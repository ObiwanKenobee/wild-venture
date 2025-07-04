import { type NextRequest, NextResponse } from "next/server"
import { paypalService } from "@/lib/paypal-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Capture the PayPal order
    const captureResult = await paypalService.captureOrder(orderId)

    // Log successful capture
    console.log("PayPal order captured:", {
      orderId,
      status: captureResult.status,
      captureId: captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id,
    })

    // Here you would typically:
    // 1. Create user account or update subscription
    // 2. Send confirmation email
    // 3. Update database with payment info

    return NextResponse.json({
      success: true,
      orderId,
      status: captureResult.status,
      captureId: captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id,
    })
  } catch (error) {
    console.error("PayPal order capture error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to capture PayPal order" },
      { status: 500 },
    )
  }
}
