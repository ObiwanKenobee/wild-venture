"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pause, Brain, CheckCircle, Upload, Mic, AlertTriangle, Lightbulb, MessageSquare } from "lucide-react"

interface AnalysisResult {
  species: string
  confidence: number
  behaviorContext: string
  meaning: string
  urgency: "low" | "medium" | "high" | "critical"
  recommendations?: string[]
}

export function WildSpeakAIDemo() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [insights, setInsights] = useState<string>("")
  const [translationMode, setTranslationMode] = useState(false)
  const [humanMessage, setHumanMessage] = useState("")
  const [targetSpecies, setTargetSpecies] = useState("")

  const mockAnalyzeCall = async () => {
    setIsAnalyzing(true)

    try {
      // Simulate audio metadata
      const audioMetadata = {
        duration: 3.2,
        frequency: "200-2000 Hz",
        amplitude: "High",
        timestamp: new Date().toISOString(),
        location: { lat: -1.2921, lng: 36.8219 }, // Nairobi coordinates
      }

      const response = await fetch("/api/wildspeak/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioMetadata,
          spectrogramData: "High frequency burst pattern with descending tones, typical of alarm calls",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAnalysis(data.analysis)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Analysis failed:", error)
      // Fallback to mock data
      setAnalysis({
        species: "Vervet Monkey",
        confidence: 94,
        behaviorContext: "Leopard Alert",
        meaning: "Danger from ground predator - climb higher immediately!",
        urgency: "critical",
        recommendations: [
          "Alert nearby rangers immediately",
          "Monitor area for predator activity",
          "Ensure tourist groups maintain safe distance",
        ],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateInsights = async () => {
    if (!analysis) return

    try {
      const response = await fetch("/api/wildspeak/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analyses: [analysis],
          location: "Nairobi National Park",
        }),
      })

      const data = await response.json()
      if (data.success) {
        setInsights(data.insights)
      }
    } catch (error) {
      console.error("Insights generation failed:", error)
      setInsights("Unable to generate insights at this time. Please try again later.")
    }
  }

  const translateMessage = async () => {
    if (!humanMessage || !targetSpecies) return

    try {
      const response = await fetch("/api/wildspeak/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: humanMessage,
          species: targetSpecies,
        }),
      })

      const data = await response.json()
      console.log("Translation result:", data.translation)
    } catch (error) {
      console.error("Translation failed:", error)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-green-100 text-green-800 border-green-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Analysis Demo */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            WildSpeak AI Translation System
          </CardTitle>
          <CardDescription>Powered by Grok AI - Real-time animal communication analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio Input Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Live Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-full ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {isRecording ? <Pause className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Analysis Button */}
          <div className="text-center">
            <Button
              onClick={mockAnalyzeCall}
              disabled={isAnalyzing}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing with Grok AI...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze Animal Call
                </>
              )}
            </Button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">AI Analysis Results</h3>
                <Badge className={getUrgencyColor(analysis.urgency)}>{analysis.urgency.toUpperCase()} PRIORITY</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Species Identified</label>
                  <p className="text-lg font-semibold">{analysis.species}</p>
                  <Badge variant="outline" className="mt-1">
                    {analysis.confidence}% Confidence
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Behavioral Context</label>
                  <p className="text-lg font-semibold">{analysis.behaviorContext}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Translation</label>
                <p className="text-lg bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">"{analysis.meaning}"</p>
              </div>

              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    AI Recommendations
                  </label>
                  <ul className="mt-2 space-y-1">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button onClick={generateInsights} variant="outline" className="w-full bg-transparent">
                <Lightbulb className="h-4 w-4 mr-2" />
                Generate Conservation Insights
              </Button>
            </div>
          )}

          {/* Conservation Insights */}
          {insights && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Conservation Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 leading-relaxed">{insights}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Experimental Translation Feature */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            Experimental: Human-to-Animal Translation
          </CardTitle>
          <CardDescription className="text-orange-600">
            ⚠️ For research and educational purposes only. Never use in wild environments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Your Message</label>
              <Textarea
                value={humanMessage}
                onChange={(e) => setHumanMessage(e.target.value)}
                placeholder="What would you like to communicate?"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Target Species</label>
              <Select value={targetSpecies} onValueChange={setTargetSpecies}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select animal species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vervet-monkey">Vervet Monkey</SelectItem>
                  <SelectItem value="african-elephant">African Elephant</SelectItem>
                  <SelectItem value="superb-starling">Superb Starling</SelectItem>
                  <SelectItem value="colobus-monkey">Colobus Monkey</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={translateMessage}
            disabled={!humanMessage || !targetSpecies}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze Translation Possibility
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
