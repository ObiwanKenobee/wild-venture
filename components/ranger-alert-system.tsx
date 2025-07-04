"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Clock, Phone, Radio } from "lucide-react"

interface CriticalAlert {
  id: string
  species: string
  meaning: string
  urgency: "critical" | "high"
  location: string
  timestamp: string
  confidence: number
}

export function RangerAlertSystem() {
  const [alerts, setAlerts] = useState<CriticalAlert[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)

  // Simulate real-time monitoring
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Simulate random critical alerts
      if (Math.random() < 0.3) {
        const newAlert: CriticalAlert = {
          id: Date.now().toString(),
          species: ["African Elephant", "Vervet Monkey", "Colobus Monkey"][Math.floor(Math.random() * 3)],
          meaning: [
            "Distress call - possible poaching activity detected",
            "Alarm call - predator threat in tourist area",
            "Panic vocalization - human encroachment alert",
          ][Math.floor(Math.random() * 3)],
          urgency: Math.random() < 0.7 ? "critical" : "high",
          location: ["Sector A-7", "Tourist Trail B", "Watering Hole C"][Math.floor(Math.random() * 3)],
          timestamp: new Date().toLocaleTimeString(),
          confidence: Math.floor(Math.random() * 20) + 80,
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-6 w-6 text-red-600" />
          Ranger Alert System
        </CardTitle>
        <CardDescription>AI-powered real-time wildlife distress monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={isMonitoring ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </Button>
          <Badge variant={isMonitoring ? "default" : "secondary"}>{isMonitoring ? "ACTIVE" : "INACTIVE"}</Badge>
        </div>

        {alerts.length === 0 && isMonitoring && (
          <div className="text-center py-8 text-gray-500">
            <Radio className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Monitoring wildlife communications...</p>
            <p className="text-sm">No critical alerts at this time</p>
          </div>
        )}

        {alerts.map((alert) => (
          <Card key={alert.id} className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <Badge className="bg-red-600 text-white">{alert.urgency.toUpperCase()}</Badge>
                  <Badge variant="outline">{alert.confidence}% confidence</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {alert.timestamp}
                </div>
              </div>

              <h4 className="font-semibold text-red-800 mb-1">{alert.species}</h4>
              <p className="text-red-700 mb-2">"{alert.meaning}"</p>

              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                {alert.location}
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => acknowledgeAlert(alert.id)} className="bg-red-600 hover:bg-red-700">
                  Acknowledge
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Call Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
