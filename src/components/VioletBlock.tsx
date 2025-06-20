'use client';

import React, { useState, useEffect } from 'react';

export default function VioletBlock() {
  const fullText = "I'll help you add a \"View Demo\" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.";
  const words = fullText.split(' ');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords(words.slice(0, currentWordIndex + 1));
        setCurrentWordIndex(currentWordIndex + 1);
      }, 100); // Typing speed - 100ms per word
      return () => clearTimeout(timer);
    } else {
      // Animation finished, hide cursor
      setShowCursor(false);
    }
  }, [currentWordIndex, words]);

  useEffect(() => {
    // Only blink cursor while animation is in progress
    if (currentWordIndex < words.length) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500); // Cursor blink speed
      return () => clearInterval(cursorTimer);
    }
  }, [currentWordIndex, words.length]);

  return (
    <div className="w-[450px] h-[140px] bg-white border border-[#e5d9ff] rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="bg-[#8b5cf6] px-5 py-3">
        <h3 className="text-white font-medium text-sm">
          Exploring the codebase
        </h3>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <div className="px-5 py-4 absolute bottom-0 left-0 right-0 min-h-full">
          <p className="text-[#374151] text-sm leading-relaxed">
            {displayedWords.join(' ')}
            {showCursor && <span className="text-black">●</span>}
          </p>
        </div>
      </div>
    </div>
  );
}