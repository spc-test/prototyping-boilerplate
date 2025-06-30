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

  // Calculate arrow direction for proper arrow head rotation
  const arrowAngle = Math.atan2(toCenterY - controlPoint2Y, toCenterX - controlPoint2X);
  const arrowSize = 8;

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    >
      <defs>
        <marker
          id={`arrowhead-${from.x}-${from.y}-${to.x}-${to.y}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="hsl(var(--border))"
            opacity="0.8"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="hsl(var(--border))"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        opacity="0.6"
        markerEnd={`url(#arrowhead-${from.x}-${from.y}-${to.x}-${to.y})`}
      />
    </svg>
  );
};