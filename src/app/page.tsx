"use client"

import { useState } from "react"
import Lottie from "lottie-react"

export default function Home() {
  const [animationError, setAnimationError] = useState(false)

  // Simplified working Lottie animation data for a spinning loader
  const animationData = {
    "v": "5.5.7",
    "fr": 30,
    "ip": 0,
    "op": 60,
    "w": 200,
    "h": 200,
    "nm": "Spinner",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Spinner",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100, "ix": 11},
          "r": {
            "a": 1,
            "k": [
              {"i": {"x": [0.667], "y": [1]}, "o": {"x": [0.333], "y": [0]}, "t": 0, "s": [0]},
              {"t": 60, "s": [360]}
            ],
            "ix": 10
          },
          "p": {"a": 0, "k": [100, 100, 0], "ix": 2},
          "a": {"a": 0, "k": [0, 0, 0], "ix": 1},
          "s": {"a": 0, "k": [100, 100, 100], "ix": 6}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [80, 80], "ix": 2},
                "p": {"a": 0, "k": [0, 0], "ix": 3},
                "nm": "Ellipse Path 1",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false
              },
              {
                "ty": "st",
                "c": {"a": 0, "k": [0.259, 0.522, 0.957, 1], "ix": 3},
                "o": {"a": 0, "k": 100, "ix": 4},
                "w": {"a": 0, "k": 6, "ix": 5},
                "lc": 2,
                "lj": 1,
                "ml": 4,
                "bm": 0,
                "d": [{"n": "d", "nm": "dash", "v": {"a": 0, "k": 20, "ix": 1}}, {"n": "g", "nm": "gap", "v": {"a": 0, "k": 10, "ix": 2}}],
                "nm": "Stroke 1",
                "mn": "ADBE Vector Graphic - Stroke",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0], "ix": 2},
                "a": {"a": 0, "k": [0, 0], "ix": 1},
                "s": {"a": 0, "k": [100, 100], "ix": 3},
                "r": {"a": 0, "k": 0, "ix": 6},
                "o": {"a": 0, "k": 100, "ix": 7},
                "sk": {"a": 0, "k": 0, "ix": 4},
                "sa": {"a": 0, "k": 0, "ix": 5},
                "nm": "Transform"
              }
            ],
            "nm": "Ellipse 1",
            "np": 3,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 60,
        "st": 0,
        "bm": 0
      }
    ],
    "markers": []
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="mb-8 flex items-center justify-center">
          {!animationError ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 200, height: 200 }}
              onError={() => setAnimationError(true)}
            />
          ) : (
            <div className="flex h-[200px] w-[200px] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}
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
