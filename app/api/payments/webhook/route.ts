import { type NextRequest, NextResponse } from "next/server"
import { webhookSecrets } from "@/lib/payment-config"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature") || request.headers.get("paypal-transmission-sig")
    const provider = request.headers.get("x-paystack-signature") ? "paystack" : "paypal"

    // Verify webhook signature
    if (provider === "paystack" && webhookSecrets.paystack) {
      const hash = crypto.createHmac("sha512", webhookSecrets.paystack).update(body).digest("hex")
      if (hash !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const event = JSON.parse(body)

    // Handle webhook events
    switch (provider) {
      case "paypal":
        await handlePayPalWebhook(event)
        break
      case "paystack":
        await handlePaystackWebhook(event)
        break
      default:
        console.log("Unknown payment provider webhook")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

async function handlePayPalWebhook(event: any) {
  console.log("PayPal webhook received:", event.event_type)

  switch (event.event_type) {
    case "PAYMENT.CAPTURE.COMPLETED":
      console.log("PayPal payment completed:", event.resource)
      // Update user subscription status
      // Send confirmation email
      break

    case "BILLING.SUBSCRIPTION.ACTIVATED":
      console.log("PayPal subscription activated:", event.resource)
      // Activate user subscription
      break

    case "BILLING.SUBSCRIPTION.CANCELLED":
      console.log("PayPal subscription cancelled:", event.resource)
      // Handle subscription cancellation
      break

    case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
      console.log("PayPal subscription payment failed:", event.resource)
      // Handle failed payment
      break

    default:
      console.log("Unhandled PayPal event:", event.event_type)
  }
}

async function handlePaystackWebhook(event: any) {
  console.log("Paystack webhook received:", event.event)

  switch (event.event) {
    case "charge.success":
      console.log("Paystack payment successful:", event.data)
      // Update user subscription status
      // Send confirmation email
      break

    case "subscription.create":
      console.log("Paystack subscription created:", event.data)
      // Activate user subscription
      break

    case "subscription.disable":
      console.log("Paystack subscription disabled:", event.data)
      // Handle subscription cancellation
      break

    case "invoice.payment_failed":
      console.log("Paystack payment failed:", event.data)
      // Handle failed payment
      break

    default:
      console.log("Unhandled Paystack event:", event.event)
  }
}
