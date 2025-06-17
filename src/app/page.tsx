"use client";

import Lottie from "lottie-react";

export default function Home() {
  // Simple working Lottie animation data for a bouncing ball
  const animationData = {
    "v": "5.5.7",
    "fr": 60,
    "ip": 0,
    "op": 120,
    "w": 200,
    "h": 200,
    "nm": "Bouncing Ball",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Ball",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100, "ix": 11},
          "r": {"a": 0, "k": 0, "ix": 10},
          "p": {
            "a": 1,
            "k": [
              {"i": {"x": 0.667, "y": 1}, "o": {"x": 0.333, "y": 0}, "t": 0, "s": [100, 50, 0]},
              {"i": {"x": 0.667, "y": 1}, "o": {"x": 0.333, "y": 0}, "t": 60, "s": [100, 150, 0]},
              {"t": 120, "s": [100, 50, 0]}
            ],
            "ix": 2
          },
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
                "s": {"a": 0, "k": [40, 40], "ix": 2},
                "p": {"a": 0, "k": [0, 0], "ix": 3},
                "nm": "Ellipse Path 1",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0.2, 0.6, 1, 1], "ix": 4},
                "o": {"a": 0, "k": 100, "ix": 5},
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
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
        "op": 120,
        "st": 0,
        "bm": 0
      }
    ],
    "markers": []
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-64 h-64">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
}
