import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Matter by JetBrains - AI-Powered Prototyping Tool",
  description: "Prototype real features directly in your codebase and validate new ideas faster than ever with AI agent. No coding required.",
  keywords: ["AI prototyping", "JetBrains", "product development", "no-code", "team collaboration", "frontend development"],
}

export default function MatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}