export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center text-white drop-shadow-lg">What matters to you?</h1>
        <input
          type="text"
          placeholder="Enter your idea..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/90 backdrop-blur-sm"
        />
      </div>
    </div>
  )
}
