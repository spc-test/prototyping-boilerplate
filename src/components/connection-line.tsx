import React from 'react';
import { TaskConnection } from '@/types/task';

interface ConnectionLineProps {
  connection: TaskConnection;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection }) => {
  const { fromPosition, toPosition } = connection;
  
  // Calculate control points for the bezier curve
  const midY = (fromPosition.y + toPosition.y) / 2;
  const controlPoint1 = { x: fromPosition.x, y: midY };
  const controlPoint2 = { x: toPosition.x, y: midY };
  
  const pathData = `M ${fromPosition.x} ${fromPosition.y} 
                   C ${controlPoint1.x} ${controlPoint1.y}, 
                     ${controlPoint2.x} ${controlPoint2.y}, 
                     ${toPosition.x} ${toPosition.y}`;

  return (
    <path
      d={pathData}
      stroke="#CCCCCC"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
    />
  );
};