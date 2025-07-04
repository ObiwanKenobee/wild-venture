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
