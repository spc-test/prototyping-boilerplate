"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [pressedKey, setPressedKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      setPressedKey(key);
      setShowKey(true);

      // Hide the key after 600ms
      setTimeout(() => {
        setShowKey(false);
      }, 600);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {showKey && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-black/80 text-white px-8 py-4 rounded-lg shadow-2xl border">
            <div className="text-4xl font-mono font-bold text-center min-w-[80px]">
              {pressedKey === " " ? "Space" : pressedKey}
            </div>
          </div>
        </div>
      )}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Press any key to see it displayed!</h1>
        <p className="text-muted-foreground">
          The pressed key will appear in the center of the screen for a brief moment.
        </p>
      </div>
    </div>
  )
}
