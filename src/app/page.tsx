export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
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
              <p className="text-white/80">So fast, it makes light jealous!</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-2">Big Brain Energy</h3>
              <p className="text-white/80">IQ so high, it needs its own zip code!</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Artistically Chaotic</h3>
              <p className="text-white/80">Picasso wishes he coded like this!</p>
            </div>
          </div>
          
          <div className="text-lg text-white/80 mb-6">
            <p className="mb-2">🤖 Built by humans, powered by coffee ☕</p>
            <p className="mb-2">🐛 Bug-free* (*bugs are features in disguise)</p>
            <p>💝 Made with love, sweat, and questionable life choices</p>
          </div>
          
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-110 shadow-lg">
            Let's Get Weird! 🎪
          </button>
        </div>
      </div>
    </div>
  )
}
