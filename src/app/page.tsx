"use client"

import { useEffect, useState } from 'react'
import Lottie from 'react-lottie-player'

export default function Home() {
  const [animationData, setAnimationData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/animations/loading-spinner.json')
      .then(response => response.json())
      .then(data => {
        console.log('Animation data loaded:', data)
        setAnimationData(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error loading animation:', error)
        setError(error.message)
        setIsLoading(false)
      })
  }, [])

  const handleComplete = () => {
    console.log('Animation completed')
  }

  const handleLoopComplete = () => {
    console.log('Animation loop completed')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {isLoading && (
          <p className="text-lg font-medium text-muted-foreground">
            Loading animation...
          </p>
        )}
        {error && (
          <p className="text-lg font-medium text-red-500">
            Error: {error}
          </p>
        )}
        {animationData && !isLoading && (
          <Lottie
            loop={true}
            animationData={animationData}
            play={true}
            style={{ width: 200, height: 200 }}
            className="drop-shadow-lg"
            onComplete={handleComplete}
            onLoopComplete={handleLoopComplete}
          />
        )}
        <p className="text-lg font-medium text-muted-foreground">
          Welcome to the Prototyping Boilerplate
        </p>
      </div>
    </div>
  )
}
