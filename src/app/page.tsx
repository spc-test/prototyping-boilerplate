"use client"

import { useState, useEffect } from "react"
import { LottieAnimation } from "@/components/lottie-animation"
import animationData from "../../public/animations/blobs-animation-flow-transparent.json"

const loadingPhrases = [
  "Creating environment",
  "Waiting for environment activation, it may take a while",
  "Waiting for process to start listening to port"
]

export default function Home() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const changePhrase = () => {
      // Fade out with downward movement
      setIsVisible(false)
      setTranslateY(10)
      
      // Change phrase after fade out completes
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length)
        // Start fade in with upward position
        setTranslateY(-10)
        // Fade in and move to center
        setTimeout(() => {
          setIsVisible(true)
          setTranslateY(0)
        }, 50) // Small delay to ensure the translateY is set before fade in
      }, 300) // 300ms for fade out duration
      
      // Random delay between 2-5 seconds (2000-5000ms)
      const randomDelay = Math.random() * 3000 + 2000
      setTimeout(changePhrase, randomDelay)
    }

    // Start the first transition after initial delay
    const randomDelay = Math.random() * 3000 + 2000
    const timeoutId = setTimeout(changePhrase, randomDelay)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#F7F7FF' }}>
      <div className="max-w-4xl">
        <LottieAnimation
          animationData={animationData}
          width={800}
          height={720}
          loop={true}
          autoplay={true}
          speed={1}
        />
      </div>
      <div 
        className="fixed inset-0 bg-white/10 backdrop-blur-[40px] pointer-events-none"
        style={{ backdropFilter: 'blur(40px)' }}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          className="text-base font-normal text-center transition-all duration-300 ease-in-out"
          style={{ 
            color: '#5D6889',
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${translateY}px)`
          }}
        >
          {loadingPhrases[currentPhraseIndex]}
        </h1>
      </div>
    </div>
  )
}
