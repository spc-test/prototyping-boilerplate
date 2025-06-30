import React from 'react';
import { TaskConnection } from '@/types/task';

interface ConnectionLineProps {
  connection: TaskConnection;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection }) => {
  const { fromPosition, toPosition } = connection;
  
  // Create unique marker id for this connection
  const markerId = `arrow-${connection.fromId}-${connection.toId}`;
  
  return (
    <g>
      {/* Arrow marker definition */}
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0,0 0,6 9,3"
            fill="#666666"
          />
        </marker>
      </defs>
      
      {/* Straight line with arrow */}
      <line
        x1={fromPosition.x}
        y1={fromPosition.y}
        x2={toPosition.x}
        y2={toPosition.y}
        stroke="#666666"
        strokeWidth={2}
        markerEnd={`url(#${markerId})`}
      />
    </g>
  );
};