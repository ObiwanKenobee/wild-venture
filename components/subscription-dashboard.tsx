"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Calendar, BarChart3, Settings, Download, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

interface SubscriptionData {
  tier: string
  status: "active" | "trial" | "cancelled" | "past_due"
  nextBilling: string
  amount: number
  currency: string
  usageStats: {
    analyses: { used: number; limit: number }
    users: { used: number; limit: number }
  }
  paymentMethod: string
}

export function SubscriptionDashboard() {
  const [subscription] = useState<SubscriptionData>({
    tier: "Ranger Pro",
    status: "active",
    nextBilling: "2024-01-15",
    amount: 45,
    currency: "USD",
    usageStats: {
      analyses: { used: 287, limit: 500 },
      users: { used: 3, limit: 5 },
    },
    paymentMethod: "PayPal",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "trial":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "past_due":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "trial":
        return <Calendar className="h-4 w-4" />
      case "cancelled":
      case "past_due":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Subscription Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Subscription Overview
          </CardTitle>
          <CardDescription>Manage your WildVenture Hub subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Current Plan</h4>
              <p className="text-2xl font-bold text-blue-600">{subscription.tier}</p>
              <Badge className={`mt-2 ${getStatusColor(subscription.status)}`}>
                {getStatusIcon(subscription.status)}
                <span className="ml-1 capitalize">{subscription.status}</span>
              </Badge>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Next Billing</h4>
              <p className="text-lg">{new Date(subscription.nextBilling).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">
                {subscription.currency} {subscription.amount}/month
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Payment Method</h4>
              <p className="text-lg">{subscription.paymentMethod}</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Update Payment
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="h-4 w-4 mr-2" />
              Manage Plan
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Usage Statistics
          </CardTitle>
          <CardDescription>Track your monthly usage and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">WildSpeak Analyses</h4>
                <span className="text-sm text-gray-600">
                  {subscription.usageStats.analyses.used} / {subscription.usageStats.analyses.limit}
                </span>
              </div>
              <Progress
                value={(subscription.usageStats.analyses.used / subscription.usageStats.analyses.limit) * 100}
                className="h-2"
              />
              <p className="text-sm text-gray-600 mt-1">
                {subscription.usageStats.analyses.limit - subscription.usageStats.analyses.used} analyses remaining
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Team Members</h4>
                <span className="text-sm text-gray-600">
                  {subscription.usageStats.users.used} / {subscription.usageStats.users.limit}
                </span>
              </div>
              <Progress
                value={(subscription.usageStats.users.used / subscription.usageStats.users.limit) * 100}
                className="h-2"
              />
              <p className="text-sm text-gray-600 mt-1">
                {subscription.usageStats.users.limit - subscription.usageStats.users.used} seats available
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Usage Insights</h4>
                <p className="text-sm text-blue-800 mt-1">
                  You're using 57% of your monthly analyses. Consider upgrading to Research Institute for unlimited
                  analyses if you need more capacity.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past payments and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "2024-12-15", amount: 45, status: "paid", invoice: "INV-001" },
              { date: "2024-11-15", amount: 45, status: "paid", invoice: "INV-002" },
              { date: "2024-10-15", amount: 45, status: "paid", invoice: "INV-003" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{new Date(payment.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{payment.invoice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${payment.amount}</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
