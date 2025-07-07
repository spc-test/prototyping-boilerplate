"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle, Users, Zap, Target, Code, Eye, Share2, GitBranch, MessageSquare, Sparkles } from "lucide-react"
import { Metadata } from "next"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

// Note: metadata export moved to layout.tsx since this is now a client component
const metadata = {
  title: "Matter by JetBrains - AI-Powered Prototyping Tool",
  description: "Prototype real features directly in your codebase and validate new ideas faster than ever with AI agent. No coding required.",
  keywords: ["AI prototyping", "JetBrains", "product development", "no-code", "team collaboration", "frontend development"],
}

interface WaitlistFormData {
  role: string
  companySize: string
  productDevelopment: string[]
  codingExperience: string
  aiTooling: string[]
  email: string
  country: string
}

export default function MatterLandingPage() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [formData, setFormData] = useState<WaitlistFormData>({
    role: "",
    companySize: "",
    productDevelopment: [],
    codingExperience: "",
    aiTooling: [],
    email: "",
    country: ""
  })

  const handleProductDevelopmentChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      productDevelopment: checked 
        ? [...prev.productDevelopment, value]
        : prev.productDevelopment.filter(item => item !== value)
    }))
  }

  const handleAiToolingChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      aiTooling: checked 
        ? [...prev.aiTooling, value]
        : prev.aiTooling.filter(item => item !== value)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  const WaitlistForm = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Join the Matter Waitlist</CardTitle>
        <CardDescription>
          Help us build the perfect AI-powered prototyping tool for your needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Q1: Role */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Q1: What best describes your role?
            </Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
            >
              {["Designer", "Product Manager", "Software Developer", "Marketer", "Founder / Entrepreneur", "Other"].map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={`role-${role}`} />
                  <Label htmlFor={`role-${role}`}>{role}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q2: Company Size */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Q2: What's the size of your company?
            </Label>
            <RadioGroup
              value={formData.companySize}
              onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
            >
              {[
                "Small Business (under 200 people)",
                "Mid-size Company (200-1,000 people)",
                "Large Enterprise (1,000+ people)",
                "I work for a startup",
                "I'm a freelancer/solo",
                "I work for an agency or consultancy"
              ].map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q3: Product Development */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Q3: What kind of product development are you involved in?
            </Label>
            <div className="space-y-2">
              {[
                "Web (e.g., websites or browser-based applications)",
                "Desktop applications (e.g., software built for operating systems like Windows or macOS)",
                "Mobile (e.g., iOS or Android applications)",
                "Embedded systems or devices (e.g., interfaces for physical products or IoT)",
                "None",
                "Other"
              ].map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`product-${type}`}
                    checked={formData.productDevelopment.includes(type)}
                    onCheckedChange={(checked) => handleProductDevelopmentChange(type, checked as boolean)}
                  />
                  <Label htmlFor={`product-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Q4: Coding Experience */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Q4: Do you have coding experience?
            </Label>
            <RadioGroup
              value={formData.codingExperience}
              onValueChange={(value) => setFormData(prev => ({ ...prev, codingExperience: value }))}
            >
              {[
                "No",
                "I have a basic understanding of the development workflow (self learning, bootcamps, etc.)",
                "I have 0-1 years of professional coding experience",
                "1-2 years of professional coding experience",
                "3-5 years of professional coding experience",
                "6+ years of professional coding experience"
              ].map(experience => (
                <div key={experience} className="flex items-center space-x-2">
                  <RadioGroupItem value={experience} id={`experience-${experience}`} />
                  <Label htmlFor={`experience-${experience}`}>{experience}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q5: AI Tooling */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Q5: What AI tooling have you tried before? (Select all that apply)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "None", "ChatGPT", "Claude", "Replit", "Lovable", "Bolt", 
                "V0", "Figma Make", "GitHub Copilot", "Cursor", "WindSurf", "Zed", "Other"
              ].map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool}`}
                    checked={formData.aiTooling.includes(tool)}
                    onCheckedChange={(checked) => handleAiToolingChange(tool, checked as boolean)}
                  />
                  <Label htmlFor={`tool-${tool}`}>{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Q6: Email */}
          <div>
            <Label htmlFor="email" className="text-base font-semibold mb-3 block">
              Q6: Your email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Q7: Country */}
          <div>
            <Label htmlFor="country" className="text-base font-semibold mb-3 block">
              Q7: Which country are you based in?
            </Label>
            <Input
              id="country"
              type="text"
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Country will be auto-filled based on your location"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Join Waitlist
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowWaitlist(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Prototyping
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Matter by JetBrains
          </h1>
          <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
            AI-powered prototyping tool for product teams
          </p>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Prototype real features directly in your codebase and validate new ideas faster than ever with AI agent. No coding required.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2" onClick={() => setShowWaitlist(true)}>
              Join Waitlist <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Build prototypes that actually work
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Matter turns your ideas into working prototypes directly in your existing codebase. Test with real data. Share instantly. Ship faster.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Build a functional flow</h3>
              <p className="text-muted-foreground">
                Build quick prototypes and test business logic with the existing codebase. Matter helps you think through ideas and communicate clearly with your team and customers, and improve stakeholder buy-in.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Enhance user experience</h3>
              <p className="text-muted-foreground">
                Explore and polish prototypes visually while staying in the same existing codebase.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Developer extends functionality</h3>
              <p className="text-muted-foreground">
                Developers build on your foundation instead of starting from scratch, focusing on complex problems rather than rebuilding prototypes.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="mb-4 text-2xl font-bold">From idea to working prototype</h3>
            <p className="mb-8 text-xl text-muted-foreground">In minutes, not weeks</p>
            <Button size="lg" className="gap-2" onClick={() => setShowWaitlist(true)}>
              Join Waitlist <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How it works</h2>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </div>
                <h3 className="mb-4 text-2xl font-bold">Connect your project</h3>
                <p className="text-muted-foreground">
                  Connect Matter to your existing repository and get a live preview running in minutes. Everything happens in an isolated environment - no risk to your production code.
                </p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-8">
                <div className="h-32 w-full rounded bg-background/50 flex items-center justify-center">
                  <GitBranch className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="md:order-2">
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </div>
                <h3 className="mb-4 text-2xl font-bold">Modify with AI</h3>
                <p className="text-muted-foreground">
                  Use simple prompts to modify your app directly: "Add a search bar to the header" or "Create a new onboarding flow". No coding is required - Matter's AI agent handles the implementation.
                </p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-8 md:order-1">
                <div className="h-32 w-full rounded bg-background/50 flex items-center justify-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </div>
                <h3 className="mb-4 text-2xl font-bold">See changes instantly</h3>
                <p className="text-muted-foreground">
                  Every change appears immediately in your live preview. Test all interactions, click through flows, and see exactly how your ideas work with real data.
                </p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-8">
                <div className="h-32 w-full rounded bg-background/50 flex items-center justify-center">
                  <Zap className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="md:order-2">
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </div>
                <h3 className="mb-4 text-2xl font-bold">Collaborate in real-time</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong>No more localhost:3000</strong> - Share your working prototype instantly with anyone</p>
                  <p><strong>Team collaboration</strong> - Invite teammates to the Matter chat and iterate together</p>
                  <p><strong>Stakeholder validation</strong> - Share functional prototypes to explain ideas clearly</p>
                  <p><strong>Customer feedback</strong> - Validate hypotheses in minutes with working demos</p>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-8 md:order-1">
                <div className="h-32 w-full rounded bg-background/50 flex items-center justify-center">
                  <Share2 className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  5
                </div>
                <h3 className="mb-4 text-2xl font-bold">Bring in developers</h3>
                <p className="text-muted-foreground mb-4">
                  Developers can join through Matter's UI or use our dedicated code editor. They see the context, understand the changes, and can extend the functionality seamlessly.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Ship with confidence. When you're ready, Matter provides everything developers need:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Working prototype with all the interactions</li>
                    <li>• Generated code to reuse as a foundation</li>
                    <li>• Clear documentation of changes and context</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-8">
                <div className="h-32 w-full rounded bg-background/50 flex items-center justify-center">
                  <Users className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why choose Matter</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Seamless team collaboration</h3>
              <p className="text-muted-foreground">
                PMs, designers, and developers work in the same codebase, building on each other's work instead of throwing ideas over the wall.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">No more handoff friction</h3>
              <p className="text-muted-foreground">
                Hand off working code and prototypes, not just specs. Everyone continues where the last person left off.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">No localhost:3000 and screen sharing anymore</h3>
              <p className="text-muted-foreground">
                Share working prototypes with teammates and customers instantly. Collaborate and iterate in real time, not through endless screen-sharing sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What you get</h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* For Product Designers & Managers */}
            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-6 text-2xl font-bold">For Product Designers & Managers</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Faster stakeholder buy-in with working demos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Quick business logic validation with real data</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Clear team communication through functional prototypes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Visual exploration in the existing codebase</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Design intent preserved in final implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No more "lost in translation" moments</span>
                </li>
              </ul>
            </div>

            {/* For Frontend Developers */}
            <div className="rounded-lg border bg-background p-8 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-6 text-2xl font-bold">For Frontend Developers</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Foundation to build upon – working prototype with all the interactions, code to reuse, clear documentation with all the context</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Focus on complex problems, not rebuilding prototypes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Less rework from misunderstood requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl">
            Be among the first to experience AI-powered prototyping
          </h2>
          <Button size="lg" variant="secondary" className="gap-2" onClick={() => setShowWaitlist(true)}>
            Join Waitlist <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <WaitlistForm />
          </div>
        </div>
      )}
    </div>
  )
}