'use client';

import React, { useState, useEffect } from 'react';

export default function VioletBlock() {
  const fullText = "I'll help you add a \"View Demo\" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.";
  const secondText = "Perfect! I've successfully added the \"View Demo\" button with a book icon above the user avatar in the navigation. The button is now positioned correctly and styled to match the existing design system.";
  const words = fullText.split(' ');
  const secondWords = secondText.split(' ');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);
  const [showSecondBlock, setShowSecondBlock] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [showFirstBlock, setShowFirstBlock] = useState(true);
  
  // Second block typing animation states
  const [secondDisplayedWords, setSecondDisplayedWords] = useState<string[]>([]);
  const [secondCurrentWordIndex, setSecondCurrentWordIndex] = useState(0);
  const [secondShowCursor, setSecondShowCursor] = useState(true);

  const resetAnimation = () => {
    setDisplayedWords([]);
    setCurrentWordIndex(0);
    setShowCursor(true);
    setFirstAnimationComplete(false);
    setShowSecondBlock(false);
    setIsSliding(false);
    setShowFirstBlock(true);
    setSecondDisplayedWords([]);
    setSecondCurrentWordIndex(0);
    setSecondShowCursor(true);
  };

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords(words.slice(0, currentWordIndex + 1));
        setCurrentWordIndex(currentWordIndex + 1);
      }, 100); // Typing speed - 100ms per word
      return () => clearTimeout(timer);
    } else {
      // Animation finished, hide cursor and mark first animation complete
      setShowCursor(false);
      setFirstAnimationComplete(true);
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

  // Show second block after first animation completes
  useEffect(() => {
    if (firstAnimationComplete) {
      const timer = setTimeout(() => {
        setShowSecondBlock(true);
        // Start sliding animation after a brief delay
        setTimeout(() => {
          setIsSliding(true);
          // Remove first block after sliding animation completes
          setTimeout(() => {
            setShowFirstBlock(false);
          }, 500); // Match the CSS transition duration
        }, 100);
      }, 500); // Wait 500ms after first animation completes
      return () => clearTimeout(timer);
    }
  }, [firstAnimationComplete]);

  // Second block typing animation
  useEffect(() => {
    if (isSliding && secondCurrentWordIndex < secondWords.length) {
      const timer = setTimeout(() => {
        setSecondDisplayedWords(secondWords.slice(0, secondCurrentWordIndex + 1));
        setSecondCurrentWordIndex(secondCurrentWordIndex + 1);
      }, 100); // Same typing speed as first block
      return () => clearTimeout(timer);
    } else if (isSliding && secondCurrentWordIndex >= secondWords.length) {
      // Second animation finished, hide cursor
      setSecondShowCursor(false);
    }
  }, [isSliding, secondCurrentWordIndex, secondWords]);

  // Second block cursor blinking
  useEffect(() => {
    if (isSliding && secondCurrentWordIndex < secondWords.length) {
      const cursorTimer = setInterval(() => {
        setSecondShowCursor(prev => !prev);
      }, 500); // Same cursor blink speed
      return () => clearInterval(cursorTimer);
    }
  }, [isSliding, secondCurrentWordIndex, secondWords.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-[450px] h-[140px] bg-white border border-[#e5d9ff] rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="bg-[#8b5cf6] px-5 py-3">
          <h3 className="text-white font-medium text-sm">
            Exploring the codebase
          </h3>
        </div>
        <div className="flex-1 relative overflow-hidden">
          {showFirstBlock && (
            <div 
              className={`px-5 py-4 absolute left-0 right-0 min-h-full transition-all duration-500 ease-in-out ${
                isSliding ? 'bottom-full' : 'bottom-0'
              }`}
            >
              <p className="text-[#374151] text-sm leading-relaxed">
                {displayedWords.join(' ')}
                {showCursor && <span className="text-black">●</span>}
              </p>
            </div>
          )}
          {showSecondBlock && (
            <div 
              className={`px-5 py-4 absolute left-0 right-0 min-h-full transition-all duration-500 ease-in-out ${
                isSliding ? 'bottom-0' : '-bottom-full'
              }`}
            >
              <p className="text-[#374151] text-sm leading-relaxed">
                {secondDisplayedWords.join(' ')}
                {secondShowCursor && <span className="text-black">●</span>}
              </p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={resetAnimation}
        className="px-4 py-2 bg-[#8b5cf6] text-white text-sm font-medium rounded-lg hover:bg-[#7c3aed] transition-colors duration-200"
      >
        Replay
      </button>
    </div>
  );
}