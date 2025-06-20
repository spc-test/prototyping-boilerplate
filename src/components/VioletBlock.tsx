import React from 'react';

export default function VioletBlock() {
  return (
    <div className="w-[450px] h-[140px] bg-[#f8f6ff] border border-[#e5d9ff] rounded-xl shadow-sm p-5">
      <div className="flex flex-col h-full">
        <h3 className="text-[#8b5cf6] font-medium text-sm mb-3">
          Exploring the codebase
        </h3>
        <p className="text-[#374151] text-sm leading-relaxed flex-1">
          I'll help you add a "View Demo" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.
        </p>
      </div>
    </div>
  );
}