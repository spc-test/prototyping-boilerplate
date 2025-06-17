export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
          <h1 className="text-6xl font-bold text-white mb-6 animate-bounce">
            🎉 Welcome to the Chaos! 🎉
          </h1>
          
          <p className="text-2xl text-white/90 mb-8 font-light">
            This is where productivity comes to die... beautifully! ✨
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Rocket Fast</h3>
              <p className="text-white/80">So fast, it breaks the speed of light... and your expectations!</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Powered</h3>
              <p className="text-white/80">Our AI is so smart, it's probably reading this right now. Hi AI! 👋</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Pretty Colors</h3>
              <p className="text-white/80">Because who doesn't love a good gradient? It's like a rainbow had a baby!</p>
            </div>
          </div>
          
          <div className="text-lg text-white/80 mb-6">
            <p className="mb-2">🎯 <strong>Fun Fact:</strong> You're the <span className="text-yellow-300 font-bold">42nd</span> visitor today!</p>
            <p className="mb-2">🍕 <strong>Random Wisdom:</strong> Pizza is a vegetable if you believe hard enough.</p>
            <p>🦄 <strong>Today's Mood:</strong> Unicorns riding rainbows while coding TypeScript!</p>
          </div>
          
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-110 shadow-lg">
            Click Me! I Do Nothing! 🎪
          </button>
          
          <div className="mt-8 text-white/60 text-sm">
            <p>Built with Next.js, tears of joy, and an unhealthy amount of coffee ☕</p>
          </div>
        </div>
      </div>
    </div>
  )
}
