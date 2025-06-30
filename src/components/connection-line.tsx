import React from 'react';

export interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  className?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  from,
  to,
  className = '',
}) => {
  // Calculate the center points of the cards (assuming card width 256px, height 112px)
  const fromCenter = { x: from.x + 128, y: from.y + 56 };
  const toCenterX = to.x + 128;
  const toCenterY = to.y + 56;
  
  // Create a smooth bezier curve
  const controlPointOffset = Math.abs(toCenterX - fromCenter.x) * 0.3;
  const controlPoint1X = fromCenter.x + controlPointOffset;
  const controlPoint1Y = fromCenter.y;
  const controlPoint2X = toCenterX - controlPointOffset;
  const controlPoint2Y = toCenterY;

  const pathData = `M ${fromCenter.x} ${fromCenter.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toCenterX} ${toCenterY}`;

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      style={{ 
        width: '100%', 
        height: '100%', 
        zIndex: 10,
        left: 0,
        top: 0
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${from.x}-${from.y}-${to.x}-${to.y}`}
          markerWidth="16"
          markerHeight="12"
          refX="15"
          refY="6"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 2, 16 6, 0 10"
            fill="#3b82f6"
            stroke="#3b82f6"
            strokeWidth="1"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
        strokeDasharray="8,4"
        opacity="0.9"
        markerEnd={`url(#arrowhead-${from.x}-${from.y}-${to.x}-${to.y})`}
      />
    </svg>
  );
};