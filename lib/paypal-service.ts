import { paymentConfig } from "./payment-config"

interface PayPalAccessToken {
  access_token: string
  token_type: string
  expires_in: number
}

interface PayPalOrder {
  id: string
  status: string
  links: Array<{
    href: string
    rel: string
    method: string
  }>
}

interface PayPalSubscription {
  id: string
  status: string
  links: Array<{
    href: string
    rel: string
    method: string
  }>
}

class PayPalService {
  private accessToken: string | null = null
  private tokenExpiry = 0

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    const auth = Buffer.from(`${paymentConfig.paypal.clientId}:${paymentConfig.paypal.clientSecret}`).toString("base64")

    const response = await fetch(`${paymentConfig.paypal.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    if (!response.ok) {
      throw new Error(`PayPal auth failed: ${response.statusText}`)
    }

    const data: PayPalAccessToken = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + data.expires_in * 1000 - 60000 // Refresh 1 minute early

    return this.accessToken
  }

  async createOrder(amount: number, currency: string, description: string): Promise<PayPalOrder> {
    const accessToken = await this.getAccessToken()

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description,
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        brand_name: "WildVenture Hub",
        user_action: "PAY_NOW",
      },
    }

    const response = await fetch(`${paymentConfig.paypal.baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`PayPal order creation failed: ${error}`)
    }

    return response.json()
  }

  async captureOrder(orderId: string): Promise<any> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${paymentConfig.paypal.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`PayPal order capture failed: ${error}`)
    }

    return response.json()
  }

  async createSubscription(planId: string, subscriberInfo: any): Promise<PayPalSubscription> {
    const accessToken = await this.getAccessToken()

    const subscriptionData = {
      plan_id: planId,
      subscriber: subscriberInfo,
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/cancel`,
        brand_name: "WildVenture Hub",
        user_action: "SUBSCRIBE_NOW",
      },
    }

    const response = await fetch(`${paymentConfig.paypal.baseUrl}/v1/billing/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`PayPal subscription creation failed: ${error}`)
    }

    return response.json()
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${paymentConfig.paypal.baseUrl}/v1/billing/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`PayPal subscription fetch failed: ${response.statusText}`)
    }

    return response.json()
  }

  async cancelSubscription(subscriptionId: string, reason: string): Promise<void> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${paymentConfig.paypal.baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok) {
      throw new Error(`PayPal subscription cancellation failed: ${response.statusText}`)
    }
  }
}

export const paypalService = new PayPalService()
