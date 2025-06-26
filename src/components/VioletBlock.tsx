'use client';

import React, { useState, useEffect, useRef, useLayoutEffect, RefObject } from 'react';
import './VioletBlock.css';

// Types and interfaces
interface Block {
  text: string;
  words: string[];
  footerIcon: 'search' | 'terminal';
  footerText: string;
}

interface AnimationConfig {
  typingSpeed: number;
  cursorBlinkSpeed: number;
  delayAfterTyping: number;
  blockTransitionDelay: number;
  slideTransitionDuration: number;
  heightTransitionDelay: number;
}

interface HeaderProps {
  title: string;
  isSliding: boolean;
}

interface ContentProps {
  content: string;
  showCursor: boolean;
  scrollOffset: number;
  isSliding: boolean;
  contentRef: RefObject<HTMLDivElement>;
}

interface FooterProps {
  icon: 'search' | 'terminal';
  text: string;
}

interface TypingAnimationState {
  currentBlockIndex: number;
  displayedWords: string[];
  currentWordIndex: number;
  showCursor: boolean;
  showFooter: boolean;
  isSliding: boolean;
}

interface HeightTransitionState {
  containerHeight: number;
  scrollOffset: number;
  heightTransitionComplete: boolean;
  baselineContentHeight: number;
}

// Default configuration
const DEFAULT_CONFIG: AnimationConfig = {
  typingSpeed: 100,
  cursorBlinkSpeed: 500,
  delayAfterTyping: 1000,
  blockTransitionDelay: 3000,
  slideTransitionDuration: 500,
  heightTransitionDelay: 300,
};

// Height calculation utilities
const getMinimumHeight = (): number => {
  const headerHeight = 38;
  const topPadding = 10;
  const bottomPadding = 10;
  const lineHeight = 24;
  const containerPadding = 10; // 5px top + 5px bottom
  return headerHeight + topPadding + lineHeight + bottomPadding + containerPadding;
};

const getMaximumHeight = (): number => {
  const headerHeight = 38;
  const topPadding = 10;
  const bottomPadding = 10;
  const lineHeight = 24;
  const maxLines = 4;
  const containerPadding = 10; // 5px top + 5px bottom
  return headerHeight + topPadding + (lineHeight * maxLines) + bottomPadding + containerPadding;
};

// Custom hook for typing animation
const useTypingAnimation = (
  blocks: Block[],
  config: AnimationConfig
): [TypingAnimationState, () => void] => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const resetAnimation = () => {
    setCurrentBlockIndex(0);
    setDisplayedWords([]);
    setCurrentWordIndex(0);
    setShowCursor(true);
    setShowFooter(false);
    setIsSliding(false);
  };

  // Main typing animation effect
  useEffect(() => {
    const currentBlock = blocks[currentBlockIndex];
    if (!currentBlock) return;

    if (currentWordIndex < currentBlock.words.length) {
      const timer = setTimeout(() => {
        const newWords = currentBlock.words.slice(0, currentWordIndex + 1);
        setDisplayedWords(newWords);
        setCurrentWordIndex(currentWordIndex + 1);
      }, config.typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Animation finished, wait before hiding cursor and showing footer
      const delayTimer = setTimeout(() => {
        setShowCursor(false);
        setShowFooter(true);
      }, config.delayAfterTyping);
      return () => clearTimeout(delayTimer);
    }
  }, [currentWordIndex, currentBlockIndex, blocks, config.typingSpeed, config.delayAfterTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const currentBlock = blocks[currentBlockIndex];
    if (!currentBlock) return;

    // Only blink cursor while animation is in progress
    if (currentWordIndex < currentBlock.words.length) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, config.cursorBlinkSpeed);
      return () => clearInterval(cursorTimer);
    }
  }, [currentWordIndex, currentBlockIndex, blocks, config.cursorBlinkSpeed]);

  // Block transition effect
  useEffect(() => {
    if (showFooter && currentBlockIndex < blocks.length - 1) {
      const timer = setTimeout(() => {
        setIsSliding(true);
        // After sliding animation completes, move to next block
        setTimeout(() => {
          setCurrentBlockIndex(prev => prev + 1);
          setDisplayedWords([]);
          setCurrentWordIndex(0);
          setShowCursor(true);
          setShowFooter(false);
          setIsSliding(false);
        }, config.slideTransitionDuration);
      }, config.blockTransitionDelay);
      return () => clearTimeout(timer);
    }
  }, [showFooter, currentBlockIndex, blocks.length, config.blockTransitionDelay, config.slideTransitionDuration]);

  return [
    {
      currentBlockIndex,
      displayedWords,
      currentWordIndex,
      showCursor,
      showFooter,
      isSliding,
    },
    resetAnimation,
  ];
};

// Custom hook for height transition
const useHeightTransition = (
  contentRef: RefObject<HTMLDivElement>,
  textContainerRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
  displayedWords: string[],
  showFooter: boolean,
  isSliding: boolean,
  config: AnimationConfig
): HeightTransitionState => {
  const [containerHeight, setContainerHeight] = useState(getMinimumHeight());
  const [scrollOffset, setScrollOffset] = useState(0);
  const [heightTransitionComplete, setHeightTransitionComplete] = useState(true);
  const [baselineContentHeight, setBaselineContentHeight] = useState(0);

  // Function to measure actual content height
  const measureContentHeight = () => {
    if (contentRef.current) {
      const headerHeight = 38;
      const contentHeight = Math.max(contentRef.current.scrollHeight, 24);
      const containerPadding = 10; // 5px top + 5px bottom
      const calculatedHeight = headerHeight + contentHeight + containerPadding;
      return Math.min(calculatedHeight, getMaximumHeight());
    }
    return getMinimumHeight();
  };

  // Function to calculate scroll offset when content overflows
  const calculateScrollOffset = () => {
    if (contentRef.current && textContainerRef.current) {
      const currentTextHeight = contentRef.current.scrollHeight;
      const containerHeight = textContainerRef.current.clientHeight;
      
      // If we haven't set a baseline yet (first time at max height), set it now
      if (baselineContentHeight === 0) {
        setBaselineContentHeight(currentTextHeight);
        return 0; // No scroll needed yet
      }
      
      // Calculate how much content has been added since we reached max height
      const additionalContent = currentTextHeight - baselineContentHeight;
      
      // Only scroll if we have additional content beyond what fits in the container
      if (additionalContent > 0) {
        return Math.max(0, additionalContent);
      }
    }
    return 0;
  };

  // Reset state when sliding starts
  useEffect(() => {
    if (isSliding) {
      setContainerHeight(getMinimumHeight());
      setScrollOffset(0);
      setBaselineContentHeight(0);
      setHeightTransitionComplete(true);
    }
  }, [isSliding]);

  // Measure and update container height after content changes
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const newHeight = measureContentHeight();
      const currentHeight = containerHeight;
      
      // Check if we're transitioning to maximum height
      if (newHeight >= getMaximumHeight() && currentHeight < getMaximumHeight()) {
        setHeightTransitionComplete(false);
      }
      
      setContainerHeight(newHeight);
      
      // Reset scroll offset when container is not at maximum height
      if (newHeight < getMaximumHeight()) {
        setScrollOffset(0);
      } else if (heightTransitionComplete && newHeight >= getMaximumHeight()) {
        // Calculate scroll offset for each word change, but only after height transition is complete
        const currentScrollAmount = calculateScrollOffset();
        setScrollOffset(currentScrollAmount);
      }
    }, 0); // Measure after DOM update
    return () => clearTimeout(timer);
  }, [displayedWords, showFooter, containerHeight, heightTransitionComplete]);

  // Listen for height transition end and add delay before enabling scroll calculations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'height') {
        // Add delay after height transition completes
        setTimeout(() => {
          setHeightTransitionComplete(true);
        }, config.heightTransitionDelay);
      }
    };

    container.addEventListener('transitionend', handleTransitionEnd);
    return () => container.removeEventListener('transitionend', handleTransitionEnd);
  }, [config.heightTransitionDelay]);

  return {
    containerHeight,
    scrollOffset,
    heightTransitionComplete,
    baselineContentHeight,
  };
};

// Animation Header Component
const AnimationHeader: React.FC<HeaderProps> = ({ title }) => (
  <div className="h-[38px] overflow-hidden">
    <div className="bg-[#F7F7FF] pt-[10px] px-[10px] pb-[22px] flex items-center justify-between rounded-xl">
      <span className="text-[#5555FF] text-xs font-normal leading-[150%]" style={{ fontFamily: 'JetBrains Sans' }}>
        {title}
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
    </div>
  </div>
);

// Animation Content Component
const AnimationContent: React.FC<ContentProps> = ({ 
  content, 
  showCursor, 
  scrollOffset, 
  isSliding, 
  contentRef 
}) => (
  <div
    ref={contentRef}
    className={`p-[10px] min-h-[44px] ${
      isSliding ? 'transition-all duration-500 ease-in-out transform -translate-y-full opacity-0' : 'transition-transform duration-300 ease-out'
    }`}
    style={{
      transform: `translateY(-${scrollOffset}px)`
    }}
  >
    <p className="text-[#374151] text-sm" style={{ lineHeight: '24px' }}>
      {content}
    </p>
  </div>
);

// Animation Footer Component
const AnimationFooter: React.FC<FooterProps> = ({ icon, text }) => (
  <div className="flex items-center gap-1 mt-2">
    {icon === 'search' ? (
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
    <span className="text-gray-500 text-xs">{text}</span>
  </div>
);

// Main VioletBlock Component
export default function VioletBlock() {
  const blocks: Block[] = [
    {
      text: "I'll help you add a \"View Demo\" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.",
      words: [],
      footerIcon: 'search',
      footerText: 'Found 0 matches'
    },
    {
      text: "Perfect! I've successfully added the \"View Demo\" button with a book icon above the user avatar in the navigation. The button is now positioned correctly and styled to match the existing design system. I've also ensured that the button has proper hover states, accessibility attributes, and responsive behavior across different screen sizes. The implementation includes proper TypeScript types, follows the project's coding conventions, and integrates seamlessly with the existing component architecture. Additionally, I've verified that the button maintains consistent spacing and alignment with other navigation elements, and the book icon is properly sized and colored to match the overall design theme.",
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

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const [animationState, resetAnimation] = useTypingAnimation(blocks, DEFAULT_CONFIG);
  const heightState = useHeightTransition(
    contentRef,
    textContainerRef,
    containerRef,
    animationState.displayedWords,
    animationState.showFooter,
    animationState.isSliding,
    DEFAULT_CONFIG
  );

  const currentBlock = blocks[animationState.currentBlockIndex];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="w-[450px] shadow-sm overflow-hidden flex flex-col transition-[height] duration-300 ease-out will-change-[height] p-[5px] rounded-2xl border"
        style={{
          height: `${heightState.containerHeight}px`,
          borderColor: 'rgba(85, 85, 255, 0.2)'
        }}
      >
        <AnimationHeader title="Exploring the codebase" isSliding={animationState.isSliding} />
        
        <div ref={textContainerRef} className="flex-1 relative overflow-hidden">
          <div
            ref={contentRef}
            className={`p-[10px] min-h-[44px] ${
              animationState.isSliding ? 'transition-all duration-500 ease-in-out transform -translate-y-full opacity-0' : 'transition-transform duration-300 ease-out'
            }`}
            style={{
              transform: `translateY(-${heightState.scrollOffset}px)`
            }}
          >
            <p className="text-[#374151] text-sm" style={{ lineHeight: '24px' }}>
              {animationState.displayedWords.join(' ')}
            </p>
          </div>
          
          {animationState.showFooter && currentBlock && (
            <div className="absolute bottom-[10px] left-[10px] right-[10px]">
              <AnimationFooter icon={currentBlock.footerIcon} text={currentBlock.footerText} />
            </div>
          )}
          
          {/* White gradient overlay to fade text under header - only show when scrolling */}
          {heightState.scrollOffset > 0 && (
            <div 
              className="absolute top-0 left-0 right-0 h-8 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)'
              }}
            />
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