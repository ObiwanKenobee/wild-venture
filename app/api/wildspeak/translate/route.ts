import { type NextRequest, NextResponse } from "next/server"
import { translateToAnimalLanguage } from "@/lib/wildspeak-ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, species } = body

    if (!message || !species) {
      return NextResponse.json({ error: "Message and species are required" }, { status: 400 })
    }

    const translation = await translateToAnimalLanguage(message, species)

    return NextResponse.json({
      success: true,
      translation,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Failed to translate message" }, { status: 500 })
  }
}
