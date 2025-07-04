import { paymentConfig } from "./payment-config"

interface PaystackTransaction {
  reference: string
  authorization_url: string
  access_code: string
}

interface PaystackSubscription {
  subscription_code: string
  email_token: string
}

class PaystackService {
  private async makeRequest(endpoint: string, method = "GET", data?: any) {
    const response = await fetch(`${paymentConfig.paystack.baseUrl}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${paymentConfig.paystack.secretKey}`,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Paystack API error: ${error}`)
    }

    return response.json()
  }

  async initializeTransaction(
    email: string,
    amount: number,
    currency: string,
    reference: string,
    metadata?: any,
  ): Promise<PaystackTransaction> {
    const data = {
      email,
      amount: amount * 100, // Paystack expects amount in kobo/cents
      currency,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
      metadata: {
        ...metadata,
        custom_fields: [
          {
            display_name: "Service",
            variable_name: "service",
            value: "WildVenture Hub Subscription",
          },
        ],
      },
    }

    const response = await this.makeRequest("/transaction/initialize", "POST", data)
    return response.data
  }

  async verifyTransaction(reference: string): Promise<any> {
    const response = await this.makeRequest(`/transaction/verify/${reference}`)
    return response.data
  }

  async createPlan(
    name: string,
    amount: number,
    interval: "daily" | "weekly" | "monthly" | "annually",
    currency = "NGN",
  ): Promise<any> {
    const data = {
      name,
      amount: amount * 100, // Convert to kobo/cents
      interval,
      currency,
    }

    const response = await this.makeRequest("/plan", "POST", data)
    return response.data
  }

  async createSubscription(customer: string, plan: string, authorization: string): Promise<PaystackSubscription> {
    const data = {
      customer,
      plan,
      authorization,
    }

    const response = await this.makeRequest("/subscription", "POST", data)
    return response.data
  }

  async getSubscription(subscriptionCode: string): Promise<any> {
    const response = await this.makeRequest(`/subscription/${subscriptionCode}`)
    return response.data
  }

  async disableSubscription(subscriptionCode: string, emailToken: string): Promise<void> {
    const data = {
      code: subscriptionCode,
      token: emailToken,
    }

    await this.makeRequest("/subscription/disable", "POST", data)
  }

  async enableSubscription(subscriptionCode: string, emailToken: string): Promise<void> {
    const data = {
      code: subscriptionCode,
      token: emailToken,
    }

    await this.makeRequest("/subscription/enable", "POST", data)
  }

  async createCustomer(email: string, firstName: string, lastName: string, phone?: string): Promise<any> {
    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
    }

    const response = await this.makeRequest("/customer", "POST", data)
    return response.data
  }

  async listBanks(country = "nigeria"): Promise<any[]> {
    const response = await this.makeRequest(`/bank?country=${country}`)
    return response.data
  }

  async resolveAccountNumber(accountNumber: string, bankCode: string): Promise<any> {
    const response = await this.makeRequest(`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`)
    return response.data
  }
}

export const paystackService = new PaystackService()
