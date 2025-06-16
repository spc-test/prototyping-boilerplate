"use client"

import { useEffect, useState } from 'react'
import Lottie from 'react-lottie-player'

export default function Home() {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch('/animations/loading-spinner.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error))
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {animationData && (
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: 200, height: 200 }}
            className="drop-shadow-lg"
          />
        )}
        <p className="text-lg font-medium text-muted-foreground">
          Welcome to the Prototyping Boilerplate
        </p>
      </div>
    </div>
  )
}
