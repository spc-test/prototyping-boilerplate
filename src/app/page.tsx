import { LottieAnimation } from "@/components/lottie-animation"
import animationData from "../../public/animations/blobs-animation-flow-transparent.json"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative max-w-md">
        <LottieAnimation
          animationData={animationData}
          width={400}
          height={360}
          loop={true}
          autoplay={true}
          speed={1}
        />
        <div 
          className="absolute inset-0 bg-white/10 backdrop-blur-[55px]"
          style={{ backdropFilter: 'blur(55px)' }}
        />
      </div>
    </div>
  )
}
