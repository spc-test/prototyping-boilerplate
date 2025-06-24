"use client";

import React, { useState, useEffect } from "react";
import { cornerSmoothing } from "@sanalabs/corner-smoothing";

// Custom Chevron Icon Component
const ChevronIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="12" 
    height="12" 
    viewBox="0 0 12 12" 
    fill="none"
    className="transform -rotate-90 flex-shrink-0"
    style={{ opacity: 0.4 }}
  >
    <g opacity="0.4">
      <path 
        d="M4.07294 2.43818C3.91318 2.59794 3.91318 2.85696 4.07294 3.01672L7.0564 6.00018L4.07294 8.98363C3.91318 9.14339 3.91318 9.40242 4.07294 9.56217C4.2327 9.72193 4.49173 9.72193 4.65149 9.56217L7.92421 6.28945C8.08397 6.12969 8.08397 5.87067 7.92421 5.71091L4.65149 2.43818C4.49173 2.27842 4.2327 2.27842 4.07294 2.43818Z" 
        fill="#5555FF"
      />
    </g>
  </svg>
);

export default function VioletBlock() {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const blocks = [
    {
      text: "I'll help you add a 'View Demo' button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.",
      status: "Found 0 matches"
    },
    {
      text: "Perfect! I've successfully added the 'View Demo' button with a book icon above the user avatar in the navigation. The button is now positioned correctly and styled to match the existing design system.",
      status: "Found 0 matches"
    },
    {
      text: "Now let me verify that the changes don't introduce any type errors or break the existing functionality. I'll run a type check to ensure everything is working correctly.",
      status: "Running the command npm run type"
    }
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentBlock < blocks.length) {
      setIsTyping(true);
      setDisplayedText("");
      
      const text = blocks[currentBlock].text;
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
          
          // Move to next block after a delay
          setTimeout(() => {
            if (currentBlock < blocks.length - 1) {
              setCurrentBlock(currentBlock + 1);
            }
          }, 2000);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [currentBlock]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const containerStyle = {
    borderRadius: "16px",
    border: "1px solid rgba(85, 85, 255, 0.30)",
    ...cornerSmoothing(16)
  };

  const headerStyle = {
    padding: "5px",
    borderRadius: "12px 12px 0px 0px",
    background: "#F7F7FF",
    ...cornerSmoothing(12, { onlyTop: true })
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className="bg-white overflow-hidden transition-all duration-500 ease-in-out"
        style={containerStyle}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between"
          style={headerStyle}
        >
          <div 
            className="text-[#5555FF] font-normal leading-[150%] pl-[10px]"
            style={{
              fontFamily: "JetBrains Sans",
              fontSize: "12px",
              lineHeight: "18px"
            }}
          >
            {blocks[currentBlock]?.status || "Found 0 matches"}
          </div>
          <ChevronIcon />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#5555FF] flex-shrink-0 mt-1 opacity-20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white w-full h-full p-1"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="21 21l-4.35-4.35"/>
              </svg>
            </div>
            
            <div className="flex-1">
              <div 
                className="text-gray-800 leading-relaxed"
                style={{
                  fontFamily: "JetBrains Sans",
                  fontSize: "14px",
                  lineHeight: "1.6"
                }}
              >
                {displayedText}
                {isTyping && showCursor && (
                  <span className="inline-block w-0.5 h-5 bg-[#5555FF] ml-1 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}