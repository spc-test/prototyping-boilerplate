import { LottieAnimation } from "@/components/lottie-animation"
import animationData from "../../public/animations/blobs-animation-flow-transparent.json"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LottieAnimation
        animationData={animationData}
        className="max-w-md"
        width={400}
        height={360}
        loop={true}
        autoplay={true}
        speed={1}
      />
    </div>
  )
}
