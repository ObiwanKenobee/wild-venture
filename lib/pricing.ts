export interface PricingTier {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency: string
  }
  features: string[]
  popular?: boolean
  target: string
  maxAnalyses?: number
  maxUsers?: number
}

export interface PaymentProvider {
  id: "paypal" | "paystack"
  name: string
  currencies: string[]
  countries: string[]
}

export const pricingTiers: PricingTier[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Perfect for students and wildlife enthusiasts",
    price: {
      monthly: 15,
      yearly: 150,
      currency: "USD",
    },
    features: [
      "50 WildSpeak AI analyses per month",
      "Basic animal call library access",
      "Educational content and quizzes",
      "Community forum access",
      "Mobile app access",
      "Email support",
    ],
    target: "Students & Enthusiasts",
    maxAnalyses: 50,
    maxUsers: 1,
  },
  {
    id: "ranger",
    name: "Ranger Pro",
    description: "Essential tools for field rangers and guides",
    price: {
      monthly: 45,
      yearly: 450,
      currency: "USD",
    },
    features: [
      "500 WildSpeak AI analyses per month",
      "Real-time alert system",
      "Critical threat detection",
      "Offline mode capability",
      "GPS integration",
      "Priority support",
      "Ranger dashboard",
      "Team collaboration tools",
    ],
    popular: true,
    target: "Rangers & Guides",
    maxAnalyses: 500,
    maxUsers: 5,
  },
  {
    id: "researcher",
    name: "Research Institute",
    description: "Advanced analytics for researchers and organizations",
    price: {
      monthly: 120,
      yearly: 1200,
      currency: "USD",
    },
    features: [
      "Unlimited WildSpeak AI analyses",
      "Advanced analytics dashboard",
      "Custom AI model training",
      "API access",
      "Data export capabilities",
      "Multi-location monitoring",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
    ],
    target: "Research Institutions",
    maxAnalyses: -1, // Unlimited
    maxUsers: 25,
  },
  {
    id: "enterprise",
    name: "Conservation Enterprise",
    description: "Complete solution for large conservation organizations",
    price: {
      monthly: 299,
      yearly: 2990,
      currency: "USD",
    },
    features: [
      "Unlimited everything",
      "Multi-park management",
      "Advanced AI customization",
      "Real-time monitoring network",
      "Custom hardware integration",
      "Training and onboarding",
      "24/7 priority support",
      "Custom development",
      "SLA guarantees",
    ],
    target: "Large Organizations",
    maxAnalyses: -1,
    maxUsers: -1,
  },
]

export const paymentProviders: PaymentProvider[] = [
  {
    id: "paypal",
    name: "PayPal",
    currencies: ["USD", "EUR", "GBP", "KES"],
    countries: ["US", "UK", "KE", "EU"],
  },
  {
    id: "paystack",
    name: "Paystack",
    currencies: ["KES", "NGN", "GHS", "ZAR"],
    countries: ["KE", "NG", "GH", "ZA"],
  },
]

export function getLocalizedPrice(tier: PricingTier, country = "US"): { amount: number; currency: string } {
  // Convert USD to local currency based on country
  const conversionRates: Record<string, { currency: string; rate: number }> = {
    KE: { currency: "KES", rate: 150 }, // 1 USD = 150 KES
    NG: { currency: "NGN", rate: 800 }, // 1 USD = 800 NGN
    GH: { currency: "GHS", rate: 12 }, // 1 USD = 12 GHS
    ZA: { currency: "ZAR", rate: 18 }, // 1 USD = 18 ZAR
    US: { currency: "USD", rate: 1 },
    UK: { currency: "GBP", rate: 0.8 },
    EU: { currency: "EUR", rate: 0.9 },
  }

  const conversion = conversionRates[country] || conversionRates["US"]

  return {
    amount: Math.round(tier.price.monthly * conversion.rate),
    currency: conversion.currency,
  }
}
