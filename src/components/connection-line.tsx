interface ConnectionLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export function ConnectionLine({ fromX, fromY, toX, toY }: ConnectionLineProps) {
  // Calculate control points for smooth bezier curve
  const midY = fromY + (toY - fromY) / 2;
  
  // Create path with smooth curves
  const path = `M ${fromX} ${fromY} 
                C ${fromX} ${midY} ${toX} ${midY} ${toX} ${toY}`;

  return (
    <path
      d={path}
      stroke="#D1D5DB"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-sm"
    />
  );
}