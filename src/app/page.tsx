import { LottieAnimation } from "@/components/lottie-animation"
import animationData from "../../public/animations/blobs-animation-flow-transparent.json"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#F7F7FF' }}>
      <div className="max-w-md">
        <LottieAnimation
          animationData={animationData}
          width={400}
          height={360}
          loop={true}
          autoplay={true}
          speed={1}
        />
      </div>
      <div 
        className="fixed inset-0 bg-white/10 backdrop-blur-[30px] pointer-events-none"
        style={{ backdropFilter: 'blur(30px)' }}
      />
    </div>
  )
}
