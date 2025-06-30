"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const randomFacts = [
  "🦆 Ducks have waterproof feathers but terrible credit scores",
  "🍕 Pizza was invented before the telephone, which explains a lot",
  "🐙 Octopuses have three hearts but still can't find love on dating apps",
  "🦘 Kangaroos can't walk backwards, just like me with JavaScript",
  "🐧 Penguins propose with pebbles, which is more romantic than most humans",
  "🍯 Honey never spoils, unlike my motivation on Monday mornings",
  "🦒 Giraffes only sleep 2 hours a day, they must be developers",
  "🐨 Koalas sleep 22 hours a day, they must be my spirit animal"
]

const sillyButtons = [
  "🎪 Make me laugh",
  "🎭 Tell me lies",
  "🎨 Paint me confused",
  "🎯 Miss the point",
  "🎪 Juggle my anxiety"
]

export default function Home() {
  const [currentFact, setCurrentFact] = useState(randomFacts[0])
  const [buttonText, setButtonText] = useState("🎲 Random Wisdom")
  const [clickCount, setClickCount] = useState(0)
  const [isWiggling, setIsWiggling] = useState(false)

  const getRandomFact = () => {
    const newFact = randomFacts[Math.floor(Math.random() * randomFacts.length)]
    setCurrentFact(newFact)
    setClickCount(prev => prev + 1)
    
    if (clickCount > 5) {
      setButtonText("🤯 You're addicted!")
    } else if (clickCount > 3) {
      setButtonText("🎪 Still clicking?")
    }
  }

  const triggerWiggle = () => {
    setIsWiggling(true)
    setTimeout(() => setIsWiggling(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        triggerWiggle()
      }
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${isWiggling ? 'animate-bounce' : ''}`}>
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to the
            <span className="block text-yellow-300 animate-pulse">
              🎪 Circus of Code 🎪
            </span>
          </h1>
          <p className="text-xl text-white/80 font-medium">
            Where bugs are features and features are mysteries! 🐛✨
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 border-4 border-yellow-400">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              🧠 Random "Facts" Generator 🧠
            </h2>
            
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl mb-6 border-2 border-dashed border-purple-300">
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                {currentFact}
              </p>
            </div>

            <Button 
              onClick={getRandomFact}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {buttonText}
            </Button>
            
            {clickCount > 0 && (
              <p className="mt-4 text-sm text-gray-600">
                You've clicked {clickCount} times. {clickCount > 10 ? "Seriously, go touch some grass! 🌱" : "Keep going! 🎯"}
              </p>
            )}
          </div>
        </div>

        {/* Silly Buttons Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-green-400">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            🎪 Useless Buttons That Do Nothing 🎪
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {sillyButtons.map((text, index) => (
              <Button
                key={index}
                onClick={() => alert(`Congratulations! You clicked "${text}" and absolutely nothing happened! 🎉`)}
                variant="outline"
                className="border-2 border-rainbow text-gray-700 font-medium hover:bg-rainbow hover:text-white transition-all duration-300 transform hover:rotate-2"
              >
                {text}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/80 text-lg">
            Built with 💖, lots of ☕, and questionable life choices
          </p>
          <p className="text-white/60 text-sm mt-2">
            Warning: This website may cause uncontrollable giggling 😂
          </p>
        </div>
      </div>
    </div>
  )
}
