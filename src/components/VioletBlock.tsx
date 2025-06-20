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
  const [showMatches, setShowMatches] = useState(false);
  const [showFirstMatches, setShowFirstMatches] = useState(false);

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
    setShowMatches(false);
    setShowFirstMatches(false);
  };

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords(words.slice(0, currentWordIndex + 1));
        setCurrentWordIndex(currentWordIndex + 1);
      }, 100); // Typing speed - 100ms per word
      return () => clearTimeout(timer);
    } else {
      // Animation finished, wait 1 second before hiding cursor and showing matches
      const delayTimer = setTimeout(() => {
        setShowCursor(false);
        setShowFirstMatches(true);
        setFirstAnimationComplete(true);
      }, 1000); // 1 second delay
      return () => clearTimeout(delayTimer);
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

  // Show second block after first animation completes and matches text is shown
  useEffect(() => {
    if (showFirstMatches) {
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
      }, 3000); // Wait 3 seconds after matches text appears
      return () => clearTimeout(timer);
    }
  }, [showFirstMatches]);

  // Second block typing animation
  useEffect(() => {
    if (isSliding && secondCurrentWordIndex < secondWords.length) {
      const timer = setTimeout(() => {
        setSecondDisplayedWords(secondWords.slice(0, secondCurrentWordIndex + 1));
        setSecondCurrentWordIndex(secondCurrentWordIndex + 1);
      }, 100); // Same typing speed as first block
      return () => clearTimeout(timer);
    } else if (isSliding && secondCurrentWordIndex >= secondWords.length) {
      // Second animation finished, wait 1 second before hiding cursor and showing matches
      const delayTimer = setTimeout(() => {
        setSecondShowCursor(false);
        setShowMatches(true);
      }, 1000); // 1 second delay
      return () => clearTimeout(delayTimer);
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
      <div className="w-[450px] h-[190px] bg-white border border-[#e5d9ff] rounded-xl shadow-sm overflow-hidden flex flex-col">
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
              {showFirstMatches && (
                <div className="flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <g opacity="0.5">
                      <path d="M5.45526 2.59064C3.87371 2.59064 2.59162 3.87274 2.59162 5.45428C2.59162 7.03582 3.87371 8.31792 5.45526 8.31792C6.30333 8.31792 7.06488 7.94977 7.58982 7.36327C8.04351 6.85637 8.31889 6.18797 8.31889 5.45428C8.31889 3.87274 7.0368 2.59064 5.45526 2.59064ZM1.77344 5.45428C1.77344 3.42087 3.42184 1.77246 5.45526 1.77246C7.48867 1.77246 9.13707 3.42087 9.13707 5.45428C9.13707 6.25729 8.87961 7.00087 8.44313 7.60604L10.3657 9.52865C10.5255 9.6884 10.5255 9.94743 10.3657 10.1072C10.206 10.2669 9.94695 10.2669 9.78719 10.1072L7.89327 8.21327C7.24419 8.78718 6.39027 9.1361 5.45526 9.1361C3.42184 9.1361 1.77344 7.48769 1.77344 5.45428Z" fill="#0C0C0D"/>
                    </g>
                  </svg>
                  <span className="text-gray-500 text-xs">Found 0 matches</span>
                </div>
              )}
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
              {showMatches && (
                <div className="flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <g opacity="0.5">
                      <path d="M5.45526 2.59064C3.87371 2.59064 2.59162 3.87274 2.59162 5.45428C2.59162 7.03582 3.87371 8.31792 5.45526 8.31792C6.30333 8.31792 7.06488 7.94977 7.58982 7.36327C8.04351 6.85637 8.31889 6.18797 8.31889 5.45428C8.31889 3.87274 7.0368 2.59064 5.45526 2.59064ZM1.77344 5.45428C1.77344 3.42087 3.42184 1.77246 5.45526 1.77246C7.48867 1.77246 9.13707 3.42087 9.13707 5.45428C9.13707 6.25729 8.87961 7.00087 8.44313 7.60604L10.3657 9.52865C10.5255 9.6884 10.5255 9.94743 10.3657 10.1072C10.206 10.2669 9.94695 10.2669 9.78719 10.1072L7.89327 8.21327C7.24419 8.78718 6.39027 9.1361 5.45526 9.1361C3.42184 9.1361 1.77344 7.48769 1.77344 5.45428Z" fill="#0C0C0D"/>
                    </g>
                  </svg>
                  <span className="text-gray-500 text-xs">Found 0 matches</span>
                </div>
              )}
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