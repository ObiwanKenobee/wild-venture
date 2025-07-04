"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Star, Users, BarChart3, Shield, Zap } from "lucide-react"
import { pricingTiers, getLocalizedPrice, type PricingTier } from "@/lib/pricing"

interface PricingSectionProps {
  onSelectPlan: (tier: PricingTier, isYearly: boolean, country: string) => void
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("US")

  const getIcon = (tierId: string) => {
    switch (tierId) {
      case "explorer":
        return <Users className="h-6 w-6" />
      case "ranger":
        return <Shield className="h-6 w-6" />
      case "researcher":
        return <BarChart3 className="h-6 w-6" />
      case "enterprise":
        return <Zap className="h-6 w-6" />
      default:
        return <Users className="h-6 w-6" />
    }
  }

  const formatPrice = (tier: PricingTier) => {
    const localPrice = getLocalizedPrice(tier, selectedCountry)
    const price = isYearly ? Math.round(localPrice.amount * 10) : localPrice.amount // 10 months for yearly

    return {
      amount: price,
      currency: localPrice.currency,
      period: isYearly ? "year" : "month",
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600 text-white">💰 Flexible Pricing</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Conservation Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From wildlife enthusiasts to research institutions, we have the perfect plan to amplify your conservation
            impact
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? "font-semibold" : "text-gray-600"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-green-600" />
            <span className={`text-sm ${isYearly ? "font-semibold" : "text-gray-600"}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800">Save 17%</Badge>
            </span>
          </div>

          {/* Country Selector */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-sm text-gray-600">Currency:</span>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">🇺🇸 USD</SelectItem>
                <SelectItem value="KE">🇰🇪 KES</SelectItem>
                <SelectItem value="NG">🇳🇬 NGN</SelectItem>
                <SelectItem value="GH">🇬🇭 GHS</SelectItem>
                <SelectItem value="ZA">🇿🇦 ZAR</SelectItem>
                <SelectItem value="UK">🇬🇧 GBP</SelectItem>
                <SelectItem value="EU">🇪🇺 EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => {
            const priceInfo = formatPrice(tier)

            return (
              <Card
                key={tier.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  tier.popular
                    ? "border-2 border-blue-500 shadow-lg scale-105"
                    : "border border-gray-200 hover:border-blue-300"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <CardHeader className={tier.popular ? "pt-12" : "pt-6"}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{getIcon(tier.id)}</div>
                    <div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <p className="text-sm text-gray-600">{tier.target}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">
                        {priceInfo.currency} {priceInfo.amount.toLocaleString()}
                      </span>
                      <span className="text-gray-600">/{priceInfo.period}</span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-green-600 mt-1">
                        Save {priceInfo.currency} {Math.round(getLocalizedPrice(tier, selectedCountry).amount * 2)} per
                        year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onSelectPlan(tier, isYearly, selectedCountry)}
                    className={`w-full ${
                      tier.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                    size="lg"
                  >
                    {tier.id === "enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>

                  {tier.id !== "enterprise" && (
                    <p className="text-xs text-center text-gray-500">14-day free trial • No credit card required</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            All plans include access to our conservation community and basic WildSpeak features
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>✓ 14-day free trial</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Secure payments</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
