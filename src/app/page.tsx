"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why do Java developers wear glasses? Because they can't C# 👓",
  "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
  "Why don't programmers like nature? It has too many bugs! 🌿",
  "There are only 10 types of people in the world: those who understand binary and those who don't 😄",
  "Why did the programmer quit his job? He didn't get arrays! 📊",
  "What's a programmer's favorite hangout place? Foo Bar! 🍻"
]

export default function Home() {
  const [currentJoke, setCurrentJoke] = useState(0)
  const [showJoke, setShowJoke] = useState(false)

  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length)
    setCurrentJoke(randomIndex)
    setShowJoke(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="animate-bounce">
          <h1 className="text-6xl font-bold text-white mb-4">
            🚀 Welcome to the Fun Zone! 🚀
          </h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Ready to prototype something awesome? 
            <br />
            <span className="text-yellow-300">Let's start with a laugh! 😂</span>
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg text-white/90">
              This boilerplate is so good, it probably debugs itself! 
              <span className="text-xl">✨</span>
            </p>
            
            <Button 
              onClick={getRandomJoke}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full text-lg transform transition hover:scale-105"
            >
              Tell me a programming joke! 🎭
            </Button>
            
            {showJoke && (
              <div className="mt-6 p-6 bg-white/20 rounded-2xl border border-white/30 animate-pulse">
                <p className="text-lg text-white font-medium">
                  {jokes[currentJoke]}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-white/70 text-sm">
          <p>
            🎯 Pro tip: While you're here having fun, your TypeScript is being extra type-safe!
          </p>
          <p className="mt-2">
            Now go build something amazing! 🔥
          </p>
        </div>
      </div>
    </div>
  )
}
