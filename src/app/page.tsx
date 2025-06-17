"use client";

import Lottie from "lottie-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-96 h-96">
        <Lottie
          animationData={{
            "v": "5.7.4",
            "fr": 30,
            "ip": 0,
            "op": 60,
            "w": 400,
            "h": 400,
            "nm": "Simple Loading",
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
                  "r": {"a": 1, "k": [{"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]}, {"t": 60, "s": [360]}]},
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
                        "nm": "Ellipse Path 1"
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
                        "nm": "Stroke 1"
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
                    "bm": 0
                  }
                ],
                "ip": 0,
                "op": 60,
                "st": 0,
                "bm": 0
              }
            ]
          }}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
}
