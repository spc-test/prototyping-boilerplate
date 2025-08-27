'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why do Java developers wear glasses? Because they can't C# 😎",
  "What's a programmer's favorite hangout place? Foo Bar! 🍺",
  "Why don't programmers like nature? It has too many bugs! 🌿",
  "How do you comfort a JavaScript bug? You console it! 🤗",
  "Why did the programmer quit his job? He didn't get arrays! 💸",
  "What do you call a programmer from Finland? Nerdic! 🇫🇮"
]

export default function Home() {
  const [currentJoke, setCurrentJoke] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const showRandomJoke = () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    setCurrentJoke(randomJoke)
    setIsVisible(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="animate-bounce">
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg animate-pulse">
            🎉 Welcome to the Fun Zone! 🎉
          </h1>
          <p className="text-2xl text-white max-w-3xl mx-auto drop-shadow-md">
            Where coding meets comedy! Get ready for some serious fun with our 
            Next.js playground of awesomeness! 🚀✨
          </p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-6 animate-pulse">
            🎭 Programming Humor Central 🎭
          </h2>
          
          <div className="space-y-6">
            <Button 
              onClick={showRandomJoke}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
            >
              🎲 Tell me a joke! 🎲
            </Button>
            
            {isVisible && (
              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-fade-in border border-white/40">
                <p className="text-xl text-white font-medium leading-relaxed">
                  {currentJoke}
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-white font-semibold">Super Fast</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-white font-semibold">Beautiful UI</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🔧</div>
              <div className="text-white font-semibold">Easy Setup</div>
            </div>
            <div className="bg-pink-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-white font-semibold">Ready to Go</div>
            </div>
          </div>
        </div>
        
        <div className="text-white/80 text-lg animate-pulse">
          <p>🌟 Life's too short for boring websites! Let's make something amazing! 🌟</p>
        </div>
      </div>
    </div>
  )
}
