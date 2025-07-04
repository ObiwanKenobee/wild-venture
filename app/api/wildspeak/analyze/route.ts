import { type NextRequest, NextResponse } from "next/server"
import { analyzeAnimalCall } from "@/lib/wildspeak-ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { audioMetadata, spectrogramData } = body

    // Validate required fields
    if (!audioMetadata || !audioMetadata.duration) {
      return NextResponse.json({ error: "Audio metadata is required" }, { status: 400 })
    }

    // Analyze the animal call using Grok AI
    const analysis = await analyzeAnimalCall(audioMetadata, spectrogramData)

    // Log for conservation tracking
    console.log(
      `WildSpeak Analysis: ${analysis.species} - ${analysis.behaviorContext} (${analysis.confidence}% confidence)`,
    )

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("WildSpeak analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze animal call" }, { status: 500 })
  }
}
