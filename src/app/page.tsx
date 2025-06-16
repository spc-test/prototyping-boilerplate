"use client"

import Lottie from "lottie-react"

export default function Home() {
  // Using a popular loading animation from LottieFiles
  const animationData = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 120,
    "w": 400,
    "h": 400,
    "nm": "Loading",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Circle",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100},
          "r": {"a": 1, "k": [{"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]}, {"t": 120, "s": [360]}]},
          "p": {"a": 0, "k": [200, 200, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 0, "k": [100, 100, 100]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [100, 100]},
                "p": {"a": 0, "k": [0, 0]},
                "nm": "Ellipse Path 1",
                "mn": "ADBE Vector Shape - Ellipse"
              },
              {
                "ty": "st",
                "c": {"a": 0, "k": [0.2, 0.6, 1, 1]},
                "o": {"a": 0, "k": 100},
                "w": {"a": 0, "k": 8},
                "lc": 1,
                "lj": 1,
                "ml": 4,
                "bm": 0,
                "nm": "Stroke 1",
                "mn": "ADBE Vector Graphic - Stroke"
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 0, "k": 0},
                "o": {"a": 0, "k": 100},
                "sk": {"a": 0, "k": 0},
                "sa": {"a": 0, "k": 0},
                "nm": "Transform"
              }
            ],
            "nm": "Ellipse 1",
            "np": 3,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group"
          }
        ],
        "ip": 0,
        "op": 120,
        "st": 0,
        "bm": 0
      }
    ],
    "markers": []
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="mb-8">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 200, height: 200 }}
          />
        </div>
        
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to Next Entree
        </h1>
        
        <p className="mb-8 max-w-md text-lg text-gray-600 dark:text-gray-300">
          A modern Next.js boilerplate with shadcn/ui, TypeScript, and Tailwind CSS.
          Ready to build amazing applications!
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Get Started
          </button>
          <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
