'use client';

import React, { useState, useEffect } from 'react';
import { Squircle } from 'corner-smoothing';

interface Block {
  text: string;
  words: string[];
  footerIcon: 'search' | 'terminal';
  footerText: string;
}

export default function VioletBlock() {
  const blocks: Block[] = [
    {
      text: "I'll help you add a \"View Demo\" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.",
      words: [],
      footerIcon: 'search',
      footerText: 'Found 0 matches'
    },
    {
      text: "Perfect! I've successfully added the \"View Demo\" button with a book icon above the user avatar in the navigation. The button is now positioned correctly and styled to match the existing design system.",
      words: [],
      footerIcon: 'search',
      footerText: 'Found 0 matches'
    },
    {
      text: "Now let me verify that the changes don't introduce any type errors or break the existing functionality. I'll run a type check to ensure everything is working correctly.",
      words: [],
      footerIcon: 'terminal',
      footerText: 'Running the command npm run type'
    }
  ];

  // Initialize words arrays
  blocks.forEach(block => {
    block.words = block.text.split(' ');
  });

  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  // Function to calculate minimum height (header + padding + one line of text)
  const getMinimumHeight = () => {
    const headerHeight = 42;
    const topPadding = 10;
    const bottomPadding = 10;
    const lineHeight = 24;
    return headerHeight + topPadding + lineHeight + bottomPadding;
  };

  const [containerHeight, setContainerHeight] = useState(getMinimumHeight());

  const resetAnimation = () => {
    setCurrentBlockIndex(0);
    setDisplayedWords([]);
    setCurrentWordIndex(0);
    setShowCursor(true);
    setShowFooter(false);
    setIsSliding(false);
    setContainerHeight(getMinimumHeight());
  };

  // Function to estimate text height based on content
  const estimateTextHeight = (text: string, includeMatches: boolean = false) => {
    const headerHeight = 42; // Updated header height (increased by 10px)
    const topPadding = 10; // p-[10px] = 10px top padding
    const bottomPadding = 10; // p-[10px] = 10px bottom padding
    const lineHeight = 24; // More accurate line height for text-sm leading-relaxed
    const containerWidth = 430; // Container width minus padding (450 - 20px for p-[10px])
    const avgCharWidth = 6.5; // More accurate character width for text-sm
    const charsPerLine = Math.floor(containerWidth / avgCharWidth);
    const estimatedLines = Math.max(1, Math.ceil(text.length / charsPerLine));

    const textHeight = estimatedLines * lineHeight;
    const matchesHeight = includeMatches ? 28 : 0; // Height for "Found 0 matches" line with margin

    return headerHeight + topPadding + textHeight + matchesHeight + bottomPadding;
  };

  // Main typing animation effect
  useEffect(() => {
    const currentBlock = blocks[currentBlockIndex];
    if (!currentBlock) return;

    if (currentWordIndex < currentBlock.words.length) {
      const timer = setTimeout(() => {
        const newWords = currentBlock.words.slice(0, currentWordIndex + 1);
        setDisplayedWords(newWords);

        // Calculate and update container height
        const currentText = newWords.join(' ');
        const newHeight = estimateTextHeight(currentText, false);
        setContainerHeight(newHeight);

        setCurrentWordIndex(currentWordIndex + 1);
      }, 100); // Typing speed - 100ms per word
      return () => clearTimeout(timer);
    } else {
      // Animation finished, wait 1 second before hiding cursor and showing footer
      const delayTimer = setTimeout(() => {
        setShowCursor(false);
        setShowFooter(true);
        // Update height to include footer text
        const finalText = currentBlock.words.join(' ');
        const newHeight = estimateTextHeight(finalText, true);
        setContainerHeight(newHeight);
      }, 1000); // 1 second delay
      return () => clearTimeout(delayTimer);
    }
  }, [currentWordIndex, currentBlockIndex, blocks]);

  // Cursor blinking effect
  useEffect(() => {
    const currentBlock = blocks[currentBlockIndex];
    if (!currentBlock) return;

    // Only blink cursor while animation is in progress
    if (currentWordIndex < currentBlock.words.length) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500); // Cursor blink speed
      return () => clearInterval(cursorTimer);
    }
  }, [currentWordIndex, currentBlockIndex, blocks]);

  // Block transition effect
  useEffect(() => {
    if (showFooter && currentBlockIndex < blocks.length - 1) {
      const timer = setTimeout(() => {
        setIsSliding(true);
        // Start shrinking container gradually during the sliding animation
        setTimeout(() => {
          setContainerHeight(getMinimumHeight()); // Shrink to minimum height during slide
        }, 150); // Start shrinking 150ms after slide begins
        // After sliding animation completes, move to next block
        setTimeout(() => {
          setCurrentBlockIndex(prev => prev + 1);
          setDisplayedWords([]);
          setCurrentWordIndex(0);
          setShowCursor(true);
          setShowFooter(false);
          setIsSliding(false);
          // Reset container height immediately for new block without animation
          setContainerHeight(getMinimumHeight());
        }, 500); // Match the CSS transition duration
      }, 3000); // Wait 3 seconds after footer appears
      return () => clearTimeout(timer);
    }
  }, [showFooter, currentBlockIndex, blocks.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Squircle
        cornerRadius={16}
        className="w-[450px] bg-white shadow-sm overflow-hidden flex flex-col transition-[height] duration-300 ease-out will-change-[height] p-[5px]"
        style={{
          height: `${containerHeight}px`,
          border: '1px solid rgba(85, 85, 255, 0.30)'
        }}
      >
        <Squircle
          cornerRadius={12}
          className="bg-[#F7F7FF] p-[10px] flex items-center justify-between"
          style={{ borderRadius: '12px 12px 0 0' }}
        >
          <span className="text-[#5555FF] text-xs font-normal leading-[150%]" style={{ fontFamily: 'JetBrains Sans' }}>
            Exploring the codebase
          </span>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="flex-shrink-0"
            >
              <g opacity="0.4">
                <path d="M4.07294 2.43818C3.91318 2.59794 3.91318 2.85696 4.07294 3.01672L7.0564 6.00018L4.07294 8.98363C3.91318 9.14339 3.91318 9.40242 4.07294 9.56217C4.2327 9.72193 4.49173 9.72193 4.65149 9.56217L7.92421 6.28945C8.08397 6.12969 8.08397 5.87067 7.92421 5.71091L4.65149 2.43818C4.49173 2.27842 4.2327 2.27842 4.07294 2.43818Z" fill="#5555FF"/>
              </g>
            </svg>
          </div>
        </Squircle>
        <div className="flex-1 relative overflow-hidden">
          <div
            className={`p-[10px] ${
              isSliding ? 'transition-all duration-500 ease-in-out transform -translate-y-full opacity-0' : ''
            }`}
          >
            <p className="text-[#374151] text-sm leading-relaxed">
              {displayedWords.join(' ')}
            </p>
            {showFooter && (
              <div className="flex items-center gap-1 mt-2">
                {blocks[currentBlockIndex]?.footerIcon === 'search' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <g opacity="0.5">
                      <path d="M5.45526 2.59064C3.87371 2.59064 2.59162 3.87274 2.59162 5.45428C2.59162 7.03582 3.87371 8.31792 5.45526 8.31792C6.30333 8.31792 7.06488 7.94977 7.58982 7.36327C8.04351 6.85637 8.31889 6.18797 8.31889 5.45428C8.31889 3.87274 7.0368 2.59064 5.45526 2.59064ZM1.77344 5.45428C1.77344 3.42087 3.42184 1.77246 5.45526 1.77246C7.48867 1.77246 9.13707 3.42087 9.13707 5.45428C9.13707 6.25729 8.87961 7.00087 8.44313 7.60604L10.3657 9.52865C10.5255 9.6884 10.5255 9.94743 10.3657 10.1072C10.206 10.2669 9.94695 10.2669 9.78719 10.1072L7.89327 8.21327C7.24419 8.78718 6.39027 9.1361 5.45526 9.1361C3.42184 9.1361 1.77344 7.48769 1.77344 5.45428Z" fill="#0C0C0D"/>
                    </g>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                      <path d="M1.77344 3.8184C1.77344 2.68873 2.68922 1.77295 3.81889 1.77295H8.18253C9.3122 1.77295 10.228 2.68873 10.228 3.8184V8.18204C10.228 9.31171 9.3122 10.2275 8.18253 10.2275H3.81889C2.68922 10.2275 1.77344 9.31171 1.77344 8.18204V3.8184ZM3.81889 2.59113C3.14109 2.59113 2.59162 3.1406 2.59162 3.8184V8.18204C2.59162 8.85984 3.14109 9.40931 3.81889 9.40931H8.18253C8.86033 9.40931 9.4098 8.85984 9.4098 8.18204V3.8184C9.4098 3.1406 8.86033 2.59113 8.18253 2.59113H3.81889ZM3.80235 4.62004C3.96211 4.46028 4.22113 4.46028 4.38089 4.62004L5.4718 5.71095C5.63156 5.87071 5.63156 6.12973 5.4718 6.28949L4.38089 7.3804C4.22113 7.54016 3.96211 7.54016 3.80235 7.3804C3.64259 7.22064 3.64259 6.96162 3.80235 6.80186L4.60399 6.00022L3.80235 5.19858C3.64259 5.03882 3.64259 4.7798 3.80235 4.62004ZM8.18253 7.50022H6.54616C6.32023 7.50022 6.13707 7.31707 6.13707 7.09113C6.13707 6.8652 6.32023 6.68204 6.54616 6.68204H8.18253C8.40846 6.68204 8.59162 6.8652 8.59162 7.09113C8.59162 7.31707 8.40846 7.50022 8.18253 7.50022Z" fill="black"/>
                    </g>
                  </svg>
                )}
                <span className="text-gray-500 text-xs">{blocks[currentBlockIndex]?.footerText}</span>
              </div>
            )}
          </div>
        </div>
      </Squircle>
      <button
        onClick={resetAnimation}
        className="px-4 py-2 bg-[#8b5cf6] text-white text-sm font-medium rounded-lg hover:bg-[#7c3aed] transition-colors duration-200"
      >
        Replay
      </button>
    </div>
  );
}