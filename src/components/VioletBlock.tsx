'use client';

import React, { useState, useEffect } from 'react';

export default function VioletBlock() {
  const fullText = "I'll help you add a \"View Demo\" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.";
  const secondText = "Perfect! I've successfully added the \"View Demo\" button with a book icon above the user avatar in the navigation. The button is now positioned correctly and styled to match the existing design system.";
  const thirdText = "Now let me verify that the changes don't introduce any type errors or break the existing functionality. I'll run a type check to ensure everything is working correctly.";
  const words = fullText.split(' ');
  const secondWords = secondText.split(' ');
  const thirdWords = thirdText.split(' ');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);
  const [showSecondBlock, setShowSecondBlock] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [showFirstBlock, setShowFirstBlock] = useState(true);
  const [containerHeight, setContainerHeight] = useState(60);

  // Second block typing animation states
  const [secondDisplayedWords, setSecondDisplayedWords] = useState<string[]>([]);
  const [secondCurrentWordIndex, setSecondCurrentWordIndex] = useState(0);
  const [secondShowCursor, setSecondShowCursor] = useState(true);
  const [showMatches, setShowMatches] = useState(false);
  const [showFirstMatches, setShowFirstMatches] = useState(false);

  // Third block typing animation states
  const [showThirdBlock, setShowThirdBlock] = useState(false);
  const [isSecondSliding, setIsSecondSliding] = useState(false);
  const [showSecondBlockContent, setShowSecondBlockContent] = useState(true);
  const [thirdDisplayedWords, setThirdDisplayedWords] = useState<string[]>([]);
  const [thirdCurrentWordIndex, setThirdCurrentWordIndex] = useState(0);
  const [thirdShowCursor, setThirdShowCursor] = useState(true);
  const [showTypeCheck, setShowTypeCheck] = useState(false);

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
    setShowThirdBlock(false);
    setIsSecondSliding(false);
    setShowSecondBlockContent(true);
    setThirdDisplayedWords([]);
    setThirdCurrentWordIndex(0);
    setThirdShowCursor(true);
    setShowTypeCheck(false);
    setContainerHeight(60);
  };

  // Function to estimate text height based on content
  const estimateTextHeight = (text: string, includeMatches: boolean = false) => {
    const headerHeight = 32; // New header height (5px padding top/bottom + text height)
    const topPadding = 16; // py-4 = 16px top padding
    const bottomPadding = 16; // Base bottom padding
    const lineHeight = 24; // More accurate line height for text-sm leading-relaxed
    const containerWidth = 370; // Container width minus padding (450 - 80px for px-5)
    const avgCharWidth = 6.5; // More accurate character width for text-sm
    const charsPerLine = Math.floor(containerWidth / avgCharWidth);
    const estimatedLines = Math.max(1, Math.ceil(text.length / charsPerLine));
    const textHeight = estimatedLines * lineHeight;
    const matchesHeight = includeMatches ? 28 : 0; // Height for "Found 0 matches" line with margin
    
    return headerHeight + topPadding + textHeight + matchesHeight + bottomPadding;
  };

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        const newWords = words.slice(0, currentWordIndex + 1);
        setDisplayedWords(newWords);
        
        // Calculate and update container height smoothly
        const currentText = newWords.join(' ');
        const newHeight = estimateTextHeight(currentText, false);
        setContainerHeight(newHeight);
        
        setCurrentWordIndex(currentWordIndex + 1);
      }, 100); // Typing speed - 100ms per word
      return () => clearTimeout(timer);
    } else {
      // Animation finished, wait 1 second before hiding cursor and showing matches
      const delayTimer = setTimeout(() => {
        setShowCursor(false);
        setShowFirstMatches(true);
        setFirstAnimationComplete(true);
        // Update height to include matches text
        const finalText = words.join(' ');
        const newHeight = estimateTextHeight(finalText, true);
        setContainerHeight(newHeight);
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

  // Show third block after second animation completes and matches text is shown
  useEffect(() => {
    if (showMatches) {
      const timer = setTimeout(() => {
        setShowThirdBlock(true);
        // Start sliding animation after a brief delay
        setTimeout(() => {
          setIsSecondSliding(true);
          // Remove second block after sliding animation completes
          setTimeout(() => {
            setShowSecondBlockContent(false);
          }, 500); // Match the CSS transition duration
        }, 100);
      }, 3000); // Wait 3 seconds after matches text appears
      return () => clearTimeout(timer);
    }
  }, [showMatches]);

  // Second block typing animation
  useEffect(() => {
    if (isSliding && secondCurrentWordIndex < secondWords.length) {
      const timer = setTimeout(() => {
        const newSecondWords = secondWords.slice(0, secondCurrentWordIndex + 1);
        setSecondDisplayedWords(newSecondWords);
        
        // Calculate and update container height for second text
        const currentSecondText = newSecondWords.join(' ');
        const newHeight = estimateTextHeight(currentSecondText, false);
        setContainerHeight(newHeight);
        
        setSecondCurrentWordIndex(secondCurrentWordIndex + 1);
      }, 100); // Same typing speed as first block
      return () => clearTimeout(timer);
    } else if (isSliding && secondCurrentWordIndex >= secondWords.length) {
      // Second animation finished, wait 1 second before hiding cursor and showing matches
      const delayTimer = setTimeout(() => {
        setSecondShowCursor(false);
        setShowMatches(true);
        // Update height to include matches text
        const finalSecondText = secondWords.join(' ');
        const newHeight = estimateTextHeight(finalSecondText, true);
        setContainerHeight(newHeight);
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

  // Third block typing animation
  useEffect(() => {
    if (isSecondSliding && thirdCurrentWordIndex < thirdWords.length) {
      const timer = setTimeout(() => {
        const newThirdWords = thirdWords.slice(0, thirdCurrentWordIndex + 1);
        setThirdDisplayedWords(newThirdWords);
        
        // Calculate and update container height for third text
        const currentThirdText = newThirdWords.join(' ');
        const newHeight = estimateTextHeight(currentThirdText, false);
        setContainerHeight(newHeight);
        
        setThirdCurrentWordIndex(thirdCurrentWordIndex + 1);
      }, 100); // Same typing speed as other blocks
      return () => clearTimeout(timer);
    } else if (isSecondSliding && thirdCurrentWordIndex >= thirdWords.length) {
      // Third animation finished, wait 1 second before hiding cursor and showing type check
      const delayTimer = setTimeout(() => {
        setThirdShowCursor(false);
        setShowTypeCheck(true);
        // Update height to include type check text
        const finalThirdText = thirdWords.join(' ');
        const newHeight = estimateTextHeight(finalThirdText, true);
        setContainerHeight(newHeight);
      }, 1000); // 1 second delay
      return () => clearTimeout(delayTimer);
    }
  }, [isSecondSliding, thirdCurrentWordIndex, thirdWords]);

  // Third block cursor blinking
  useEffect(() => {
    if (isSecondSliding && thirdCurrentWordIndex < thirdWords.length) {
      const cursorTimer = setInterval(() => {
        setThirdShowCursor(prev => !prev);
      }, 500); // Same cursor blink speed
      return () => clearInterval(cursorTimer);
    }
  }, [isSecondSliding, thirdCurrentWordIndex, thirdWords.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="w-[450px] bg-white rounded-[16px] shadow-sm overflow-hidden flex flex-col transition-[height] duration-300 ease-out will-change-[height]"
        style={{ 
          height: `${containerHeight}px`,
          border: '1px solid rgba(85, 85, 255, 0.30)'
        }}
      >
        <div className="bg-[#F7F7FF] px-0 py-[5px] rounded-t-[12px] flex items-center justify-between">
          <span className="text-[#5555FF] text-xs font-normal leading-[150%] pl-[10px]" style={{ fontFamily: 'JetBrains Sans' }}>
            Exploring the codebase
          </span>
          <div className="pr-[10px]">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none"
              style={{ transform: 'rotate(-90deg)' }}
              className="flex-shrink-0"
            >
              <g opacity="0.4">
                <path d="M4.07294 2.43818C3.91318 2.59794 3.91318 2.85696 4.07294 3.01672L7.0564 6.00018L4.07294 8.98363C3.91318 9.14339 3.91318 9.40242 4.07294 9.56217C4.2327 9.72193 4.49173 9.72193 4.65149 9.56217L7.92421 6.28945C8.08397 6.12969 8.08397 5.87067 7.92421 5.71091L4.65149 2.43818C4.49173 2.27842 4.2327 2.27842 4.07294 2.43818Z" fill="#5555FF"/>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex-1 relative">
          {showFirstBlock && (
            <div
              className={`px-5 py-4 transition-all duration-500 ease-in-out ${
                isSliding ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
              }`}
            >
              <p className="text-[#374151] text-sm leading-relaxed">
                {displayedWords.join(' ')}
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
          {showSecondBlock && showSecondBlockContent && (
            <div
              className={`px-5 py-4 transition-all duration-500 ease-in-out ${
                isSliding ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
              } ${
                isSecondSliding ? 'transform -translate-y-full opacity-0' : ''
              }`}
            >
              <p className="text-[#374151] text-sm leading-relaxed">
                {secondDisplayedWords.join(' ')}
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
          {showThirdBlock && (
            <div
              className={`px-5 py-4 transition-all duration-500 ease-in-out ${
                isSecondSliding ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
              }`}
            >
              <p className="text-[#374151] text-sm leading-relaxed">
                {thirdDisplayedWords.join(' ')}
              </p>
              {showTypeCheck && (
                <div className="flex items-center gap-1 mt-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                      <path d="M1.77344 3.8184C1.77344 2.68873 2.68922 1.77295 3.81889 1.77295H8.18253C9.3122 1.77295 10.228 2.68873 10.228 3.8184V8.18204C10.228 9.31171 9.3122 10.2275 8.18253 10.2275H3.81889C2.68922 10.2275 1.77344 9.31171 1.77344 8.18204V3.8184ZM3.81889 2.59113C3.14109 2.59113 2.59162 3.1406 2.59162 3.8184V8.18204C2.59162 8.85984 3.14109 9.40931 3.81889 9.40931H8.18253C8.86033 9.40931 9.4098 8.85984 9.4098 8.18204V3.8184C9.4098 3.1406 8.86033 2.59113 8.18253 2.59113H3.81889ZM3.80235 4.62004C3.96211 4.46028 4.22113 4.46028 4.38089 4.62004L5.4718 5.71095C5.63156 5.87071 5.63156 6.12973 5.4718 6.28949L4.38089 7.3804C4.22113 7.54016 3.96211 7.54016 3.80235 7.3804C3.64259 7.22064 3.64259 6.96162 3.80235 6.80186L4.60399 6.00022L3.80235 5.19858C3.64259 5.03882 3.64259 4.7798 3.80235 4.62004ZM8.18253 7.50022H6.54616C6.32023 7.50022 6.13707 7.31707 6.13707 7.09113C6.13707 6.8652 6.32023 6.68204 6.54616 6.68204H8.18253C8.40846 6.68204 8.59162 6.8652 8.59162 7.09113C8.59162 7.31707 8.40846 7.50022 8.18253 7.50022Z" fill="black"/>
                    </g>
                  </svg>
                  <span className="text-gray-500 text-xs">Running the command npm run type</span>
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