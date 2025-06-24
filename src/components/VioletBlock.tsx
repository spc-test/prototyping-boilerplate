"use client"

import { useState, useEffect } from 'react'

export default function VioletBlock() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const steps = [
    {
      title: "Analyzing request...",
      content: "I'll help you add a 'View Demo' button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature."
    },
    {
      title: "Implementation complete",
      content: "Perfect! I've successfully added the 'View Demo' button with a book icon above the user avatar in the navigation. The button is now positioned correctly and styled to match the existing design system."
    },
    {
      title: "Running verification...",
      content: "Now let me verify that the changes don't introduce any type errors or break the existing functionality. I'll run a type check to ensure everything is working correctly."
    }
  ]

  const typewriterEffect = (text: string, callback?: () => void) => {
    setIsTyping(true)
    setDisplayedText('')
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
        setIsTyping(false)
        if (callback) callback()
      }
    }, 30)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true)
      typewriterEffect(steps[currentStep].content, () => {
        if (currentStep < steps.length - 1) {
          setTimeout(() => {
            setCurrentStep(prev => prev + 1)
          }, 2000)
        }
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [currentStep])

  const ChevronIcon = () => (
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
        <path 
          d="M4.07294 2.43818C3.91318 2.59794 3.91318 2.85696 4.07294 3.01672L7.0564 6.00018L4.07294 8.98363C3.91318 9.14339 3.91318 9.40242 4.07294 9.56217C4.2327 9.72193 4.49173 9.72193 4.65149 9.56217L7.92421 6.28945C8.08397 6.12969 8.08397 5.87067 7.92421 5.71091L4.65149 2.43818C4.49173 2.27842 4.2327 2.27842 4.07294 2.43818Z" 
          fill="#5555FF"
        />
      </g>
    </svg>
  )

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className="transition-all duration-500 ease-in-out"
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(85, 85, 255, 0.30)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-[5px]"
          style={{
            borderRadius: '12px 12px 0px 0px',
            background: '#F7F7FF'
          }}
        >
          <div 
            className="pl-[10px]"
            style={{
              color: '#5555FF',
              fontFamily: 'JetBrains Sans',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '150%'
            }}
          >
            {steps[currentStep].title}
          </div>
          <ChevronIcon />
        </div>

        {/* Content */}
        <div className={`transition-[height] duration-300 ease-out overflow-hidden ${
          isExpanded ? 'h-auto' : 'h-0'
        }`}>
          <div className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10.5 5.25H6.75V1.5C6.75 1.08579 6.41421 0.75 6 0.75C5.58579 0.75 5.25 1.08579 5.25 1.5V5.25H1.5C1.08579 5.25 0.75 5.58579 0.75 6C0.75 6.41421 1.08579 6.75 1.5 6.75H5.25V10.5C5.25 10.9142 5.58579 11.25 6 11.25C6.41421 11.25 6.75 10.9142 6.75 10.5V6.75H10.5C10.9142 6.75 11.25 6.41421 11.25 6C11.25 5.58579 10.9142 5.25 10.5 5.25Z" fill="#8B5CF6"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}