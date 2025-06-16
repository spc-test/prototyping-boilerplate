"use client"

import { useEffect, useRef } from "react"
import Lottie, { LottieRefCurrentProps } from "lottie-react"

interface LottieAnimationProps {
  animationData: any
  className?: string
  width?: number | string
  height?: number | string
  loop?: boolean
  autoplay?: boolean
  speed?: number
}

export function LottieAnimation({
  animationData,
  className = "",
  width = "100%",
  height = "100%",
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed)
    }
  }, [speed])

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoPlay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}