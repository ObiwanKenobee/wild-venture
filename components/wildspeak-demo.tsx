"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Brain, CheckCircle } from "lucide-react"

export function WildSpeakDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentCall, setCurrentCall] = useState(0)

  const animalCalls = [
    {
      animal: "Vervet Monkey",
      context: "Leopard Alert",
      meaning: "Danger from ground predator - climb higher!",
      confidence: 94,
      location: "Nairobi National Park",
    },
    {
      animal: "African Elephant",
      context: "Family Greeting",
      meaning: "Joyful reunion after separation",
      confidence: 89,
      location: "Amboseli National Park",
    },
    {
      animal: "Superb Starling",
      context: "Territory Defense",
      meaning: "This area is occupied - stay away",
      confidence: 92,
      location: "Karura Forest",
    },
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextCall = () => {
    setCurrentCall((prev) => (prev + 1) % animalCalls.length)
    setIsPlaying(false)
  }

  const call = animalCalls[currentCall]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          WildSpeak AI Demo
        </CardTitle>
        <CardDescription>Experience real-time animal communication translation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audio Visualization */}
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex space-x-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 bg-green-400 rounded-full transition-all duration-300 ${
                    isPlaying ? `h-${Math.floor(Math.random() * 8) + 4}` : "h-2"
                  }`}
                />
              ))}
            </div>
          </div>
          <Button onClick={togglePlay} className="bg-green-600 hover:bg-green-700" size="lg">
            {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
            {isPlaying ? "Pause" : "Play"} Animal Call
          </Button>
        </div>

        {/* Translation Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI Translation Results</h3>
            <Badge variant="outline" className="text-green-600 border-green-600">
              {call.confidence}% Confidence
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Species</label>
              <p className="text-lg font-semibold">{call.animal}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Context</label>
              <p className="text-lg font-semibold">{call.context}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Meaning</label>
            <p className="text-lg bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">"{call.meaning}"</p>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
            Recorded at {call.location}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={nextCall} variant="outline" className="flex-1 bg-transparent">
            Try Another Call
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Learn More</Button>
        </div>
      </CardContent>
    </Card>
  )
}
