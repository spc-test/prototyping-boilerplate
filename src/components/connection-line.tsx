interface ConnectionLineProps {
  waypoints: { x: number; y: number }[];
  color?: string;
}

export function ConnectionLine({ waypoints, color = "#D1D5DB" }: ConnectionLineProps) {
  if (waypoints.length < 2) return null;
  
  // Create orthogonal path from waypoints
  let path = `M ${waypoints[0].x} ${waypoints[0].y}`;
  
  for (let i = 1; i < waypoints.length; i++) {
    path += ` L ${waypoints[i].x} ${waypoints[i].y}`;
  }

  return (
    <path
      d={path}
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-sm"
    />
  );
}