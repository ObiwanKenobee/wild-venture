"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  MapPin,
  Users,
  Zap,
  TreePine,
  Heart,
  Star,
  Calendar,
  Globe,
  Mic,
  Brain,
  BookOpen,
  Radio,
  Volume2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WildSpeakAIDemo } from "@/components/wildspeak-ai-demo"
import { PricingSection } from "@/components/pricing-section"
import { PaymentModal } from "@/components/payment-modal"
import { useState } from "react"
import type { PricingTier } from "@/types"

export default function LandingPage() {
  const experiences = [
    {
      title: "WildSpeak Field Training",
      location: "Nairobi National Park",
      difficulty: "Intermediate",
      cause: "Animal Communication",
      image: "/placeholder.svg?height=200&width=300",
      participants: 16,
      date: "Dec 12, 2024",
      type: "wildspeak",
    },
    {
      title: "Ngong Forest Clean-up Trek",
      location: "Ngong Hills, Nairobi",
      difficulty: "Beginner",
      cause: "Forest Conservation",
      image: "/placeholder.svg?height=200&width=300",
      participants: 24,
      date: "Dec 15, 2024",
    },
    {
      title: "Elephant Communication Study",
      location: "Amboseli National Park",
      difficulty: "Advanced",
      cause: "Wildlife Research",
      image: "/placeholder.svg?height=200&width=300",
      participants: 12,
      date: "Dec 18, 2024",
      type: "wildspeak",
    },
    {
      title: "Tech-for-Wildlife Hackathon",
      location: "Nairobi National Park",
      difficulty: "Intermediate",
      cause: "Wildlife Protection",
      image: "/placeholder.svg?height=200&width=300",
      participants: 18,
      date: "Dec 22, 2024",
    },
    {
      title: "Bird Language Immersion",
      location: "Karura Forest",
      difficulty: "All Levels",
      cause: "Biodiversity Research",
      image: "/placeholder.svg?height=200&width=300",
      participants: 32,
      date: "Jan 5, 2025",
      type: "wildspeak",
    },
  ]

  const partners = [
    { name: "Ujuzi Manyattas", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Nature Kenya", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Kenya Wildlife Service", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Green Belt Movement", logo: "/placeholder.svg?height=60&width=120" },
  ]

  const pillars = [
    {
      icon: Heart,
      title: "Service",
      description:
        "Making a real impact on Kenya's conservation challenges through hands-on community service and environmental restoration projects.",
    },
    {
      icon: TreePine,
      title: "Adventure",
      description:
        "Exploring Kenya's stunning landscapes while learning from indigenous communities and discovering hidden natural treasures.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Leveraging technology and creative solutions to address conservation challenges and amplify our environmental impact.",
    },
    {
      icon: Globe,
      title: "WildSpeak",
      description:
        "Revolutionary AI-powered platform that translates animal communications, bridging the gap between humans and wildlife through advanced bioacoustic analysis.",
    },
  ]

  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isYearlyBilling, setIsYearlyBilling] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("US")

  const handleSelectPlan = (tier: PricingTier, isYearly: boolean, country: string) => {
    setSelectedTier(tier)
    setIsYearlyBilling(isYearly)
    setSelectedCountry(country)
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">WildVenture Hub</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#experiences" className="text-gray-700 hover:text-green-600 transition-colors">
              Explore
            </Link>
            <Link href="#partners" className="text-gray-700 hover:text-green-600 transition-colors">
              Partners
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Button variant="outline" size="sm">
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20" />
        <Image
          src="/placeholder.svg?height=800&width=1200"
          alt="Nairobi landscape with adventure scenes"
          fill
          className="object-cover -z-10"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-green-600/90 text-white border-0">
              🌍 Where Tech Meets Conservation Adventure
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Explore. <span className="text-green-300">Conserve.</span> Innovate.
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-50 max-w-3xl mx-auto">
              Join Kenya's most impactful conservation adventures. Connect with nature, learn from indigenous
              communities, and breakthrough animal communication barriers with our revolutionary AI-powered WildSpeak
              technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                Join a Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg bg-transparent"
              >
                Host an Experience
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Three Pillars</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every WildVenture experience is built on these foundational principles
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <pillar.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WildSpeak Technology Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600 text-white">🎙️ Revolutionary Technology</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Introducing WildSpeak</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The world's first AI-powered human-animal communication system. Break down the barriers between species
              and understand wildlife like never before.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="mb-16">
            <WildSpeakAIDemo />
          </div>

          {/* Tech Modules */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Mic className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Bioacoustic Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced field recording devices capture animal calls from microphones, camera traps, and drones
                  across Kenya's ecosystems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">AI Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Machine learning models classify species, behavioral context, and emotional states using TensorFlow
                  and advanced audio analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Immersive interfaces let users learn animal languages through quizzes, games, and call-response
                  simulations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Radio className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Speak Back</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Experimental audio synthesis allows controlled communication attempts with wildlife in research
                  environments.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Benefits from WildSpeak?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From students to researchers, WildSpeak opens new possibilities for human-wildlife interaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🧒</span>
                  Youth & Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn how different animals communicate through interactive games and educational content that makes
                  wildlife conservation engaging and accessible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👨🏾‍🌾</span>
                  Rangers & Guards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Interpret distress calls and territory warnings to detect poaching activities and respond to wildlife
                  emergencies more effectively.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🧪</span>
                  Researchers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Rapidly classify and analyze acoustic data in the field, accelerating wildlife behavior studies and
                  conservation research.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🧘</span>
                  Tourists & Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Add immersive, educational interactions to safari experiences, helping visitors understand and connect
                  with wildlife on a deeper level.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌿</span>
                  Activists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Raise awareness of animal stress patterns and document the impact of human activities on wildlife
                  communication and behavior.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏫</span>
                  Educators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Bring cutting-edge conservation technology into classrooms, inspiring the next generation of wildlife
                  protectors and researchers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-20 bg-green-50" id="experiences">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Experiences</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our next conservation adventures and make a real impact
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {experiences.map((experience, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">{experience.difficulty}</Badge>
                  {experience.type === "wildspeak" && (
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                      <Volume2 className="h-3 w-3 mr-1" />
                      WildSpeak
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {experience.cause}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {experience.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{experience.title}</CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {experience.participants} joined
                    </div>
                    <Button
                      size="sm"
                      className={
                        experience.type === "wildspeak"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      }
                    >
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
            >
              View All Experiences
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Partners Section */}
      <section className="py-20 bg-white" id="partners">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Conservation Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Working together with Kenya's leading conservation organizations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Become a Partner
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Adventurers Joined</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-green-100">Conservation Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-green-100">Partner Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-green-100">Trees Planted</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Kenya's most innovative conservation community. Your next adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg">
              Start Your Journey
              <Star className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">WildVenture Hub</span>
              </div>
              <p className="text-gray-400">Where technology meets conservation adventure in the heart of Kenya.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Experiences</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Adventure Hikes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Eco-Treks
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tech Hackathons
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Bird Mapping
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Join Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WildVenture Hub. All rights reserved. Made with ❤️ for Kenya's conservation future.</p>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedTier={selectedTier}
        isYearly={isYearlyBilling}
        country={selectedCountry}
      />
    </div>
  )
}
