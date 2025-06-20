import React from 'react';

export default function VioletBlock() {
  return (
    <div className="w-[450px] h-[140px] bg-white border border-[#e5d9ff] rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="bg-[#8b5cf6] px-5 py-3">
        <h3 className="text-white font-medium text-sm">
          Exploring the codebase
        </h3>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <div className="px-5 py-4 absolute bottom-0 left-0 right-0">
          <p className="text-[#374151] text-sm leading-relaxed">
            I'll help you add a "View Demo" button with a book icon above the user avatar. Let me first explore the current navigation structure to understand where the user avatar is located and how to implement this feature.
          </p>
        </div>
      </div>
    </div>
  );
}