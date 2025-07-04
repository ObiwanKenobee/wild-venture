import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export interface AnimalCallAnalysis {
  species: string
  confidence: number
  behaviorContext: string
  meaning: string
  urgency: "low" | "medium" | "high" | "critical"
  location?: string
  recommendations?: string[]
}

export interface AudioMetadata {
  duration: number
  frequency: string
  amplitude: string
  timestamp: string
  location?: {
    lat: number
    lng: number
  }
}

export async function analyzeAnimalCall(
  audioMetadata: AudioMetadata,
  spectrogramData?: string,
): Promise<AnimalCallAnalysis> {
  try {
    const prompt = `
You are WildSpeak AI, an expert in African wildlife bioacoustics and animal communication. 
Analyze this animal call data and provide detailed insights.

Audio Metadata:
- Duration: ${audioMetadata.duration}s
- Frequency Range: ${audioMetadata.frequency}
- Amplitude: ${audioMetadata.amplitude}
- Recorded: ${audioMetadata.timestamp}
${audioMetadata.location ? `- Location: ${audioMetadata.location.lat}, ${audioMetadata.location.lng}` : ""}

${spectrogramData ? `Spectrogram Analysis: ${spectrogramData}` : ""}

Based on this data from Kenya's wildlife, provide analysis in this exact JSON format:
{
  "species": "Most likely animal species",
  "confidence": 85,
  "behaviorContext": "Specific behavior (alarm, mating, territorial, social, distress, etc.)",
  "meaning": "Human-readable translation of what the animal is communicating",
  "urgency": "low|medium|high|critical",
  "recommendations": ["Action item 1", "Action item 2"]
}

Focus on Kenya's common wildlife: elephants, lions, leopards, vervet monkeys, colobus monkeys, various bird species, etc.
Consider the context - is this a distress call requiring immediate attention? A territorial warning? Social communication?
`

    const { text } = await generateText({
      model: xai("grok-beta"),
      prompt,
      temperature: 0.3, // Lower temperature for more consistent analysis
    })

    // Parse the JSON response
    const analysis = JSON.parse(text.trim())

    // Validate and ensure all required fields are present
    return {
      species: analysis.species || "Unknown Species",
      confidence: Math.min(Math.max(analysis.confidence || 0, 0), 100),
      behaviorContext: analysis.behaviorContext || "Unknown Behavior",
      meaning: analysis.meaning || "Unable to determine meaning",
      urgency: analysis.urgency || "low",
      recommendations: analysis.recommendations || [],
    }
  } catch (error) {
    console.error("Error analyzing animal call:", error)
    throw new Error("Failed to analyze animal call")
  }
}

export async function generateConservationInsights(
  recentAnalyses: AnimalCallAnalysis[],
  location: string,
): Promise<string> {
  const prompt = `
As WildSpeak AI, analyze these recent animal communication patterns from ${location} and provide conservation insights:

Recent Animal Communications:
${recentAnalyses
  .map(
    (analysis, i) => `
${i + 1}. ${analysis.species} - ${analysis.behaviorContext}
   Meaning: "${analysis.meaning}"
   Urgency: ${analysis.urgency}
   Confidence: ${analysis.confidence}%
`,
  )
  .join("")}

Provide actionable conservation insights focusing on:
1. Patterns in animal behavior and stress levels
2. Potential threats or changes in the ecosystem
3. Recommendations for rangers and conservationists
4. Educational opportunities for visitors

Keep response under 300 words and focus on practical, Kenya-specific conservation actions.
`

  const { text } = await generateText({
    model: xai("grok-beta"),
    prompt,
    temperature: 0.7,
  })

  return text
}

export async function translateToAnimalLanguage(
  humanMessage: string,
  targetSpecies: string,
): Promise<{
  canTranslate: boolean
  audioInstructions?: string
  safetyWarning: string
}> {
  const prompt = `
As WildSpeak AI, the user wants to communicate "${humanMessage}" to a ${targetSpecies}.

IMPORTANT: This is experimental and should only be used in controlled research environments.

Analyze if this communication is:
1. Safe and ethical
2. Scientifically meaningful
3. Possible to approximate with known vocalizations

Respond in JSON format:
{
  "canTranslate": true/false,
  "audioInstructions": "If possible, describe the vocal pattern/sounds to make",
  "safetyWarning": "Always include safety and ethical considerations"
}

Never encourage direct wild animal interaction. Focus on research and educational contexts.
`

  const { text } = await generateText({
    model: xai("grok-beta"),
    prompt,
    temperature: 0.2,
  })

  return JSON.parse(text.trim())
}
