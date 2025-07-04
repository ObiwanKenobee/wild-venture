import { type NextRequest, NextResponse } from "next/server"
import { generateConservationInsights } from "@/lib/wildspeak-ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { analyses, location } = body

    if (!analyses || !Array.isArray(analyses) || analyses.length === 0) {
      return NextResponse.json({ error: "Analysis data is required" }, { status: 400 })
    }

    const insights = await generateConservationInsights(analyses, location || "Kenya")

    return NextResponse.json({
      success: true,
      insights,
      analysisCount: analyses.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Conservation insights error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
