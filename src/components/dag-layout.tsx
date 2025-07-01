export enum ConnectionPoint {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface IdeaNode {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  status: 'default' | 'active' | 'completed';
  parentId?: string;
}

export interface PositionedNode extends IdeaNode {
  x: number;
  y: number;
  level: number;
}

export interface Connection {
  fromId: string;
  toId: string;
  fromPoint: ConnectionPoint;
  toPoint: ConnectionPoint;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  waypoints: { x: number; y: number }[];
}

const CARD_WIDTH = 240;
const CARD_HEIGHT = 80;
const LEVEL_SPACING = 120;
const HORIZONTAL_SPACING = 60;
const CONNECTION_OFFSET = 20; // Minimum distance from card edge for routing

// Helper function to get connection point coordinates
function getConnectionPoint(node: PositionedNode, point: ConnectionPoint): { x: number; y: number } {
  switch (point) {
    case ConnectionPoint.TOP:
      return { x: node.x + CARD_WIDTH / 2, y: node.y };
    case ConnectionPoint.BOTTOM:
      return { x: node.x + CARD_WIDTH / 2, y: node.y + CARD_HEIGHT };
    case ConnectionPoint.LEFT:
      return { x: node.x, y: node.y + CARD_HEIGHT / 2 };
    case ConnectionPoint.RIGHT:
      return { x: node.x + CARD_WIDTH, y: node.y + CARD_HEIGHT / 2 };
  }
}

// Calculate distance between two points
function distance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y); // Manhattan distance for orthogonal routing
}

// Check if a point is inside a card
function isPointInCard(point: { x: number; y: number }, card: PositionedNode): boolean {
  return point.x >= card.x - 10 && 
         point.x <= card.x + CARD_WIDTH + 10 && 
         point.y >= card.y - 10 && 
         point.y <= card.y + CARD_HEIGHT + 10;
}

// Generate orthogonal path between two connection points
function generateOrthogonalPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromPoint: ConnectionPoint,
  toPoint: ConnectionPoint,
  allNodes: PositionedNode[]
): { x: number; y: number }[] {
  const waypoints: { x: number; y: number }[] = [];
  
  // Add starting point
  waypoints.push(from);
  
  // Calculate intermediate waypoints based on connection directions
  if (fromPoint === ConnectionPoint.BOTTOM && toPoint === ConnectionPoint.TOP) {
    // Simple vertical connection
    if (from.x === to.x) {
      // Direct vertical line
      waypoints.push(to);
    } else {
      // L-shaped connection
      const midY = from.y + (to.y - from.y) / 2;
      waypoints.push({ x: from.x, y: midY });
      waypoints.push({ x: to.x, y: midY });
      waypoints.push(to);
    }
  } else if (fromPoint === ConnectionPoint.RIGHT && toPoint === ConnectionPoint.LEFT) {
    // Simple horizontal connection
    if (from.y === to.y) {
      // Direct horizontal line
      waypoints.push(to);
    } else {
      // L-shaped connection
      const midX = from.x + (to.x - from.x) / 2;
      waypoints.push({ x: midX, y: from.y });
      waypoints.push({ x: midX, y: to.y });
      waypoints.push(to);
    }
  } else {
    // Complex routing - use multiple waypoints
    const offsetDistance = CONNECTION_OFFSET;
    
    // Add offset from starting point
    let currentPoint = { ...from };
    switch (fromPoint) {
      case ConnectionPoint.TOP:
        currentPoint = { x: from.x, y: from.y - offsetDistance };
        break;
      case ConnectionPoint.BOTTOM:
        currentPoint = { x: from.x, y: from.y + offsetDistance };
        break;
      case ConnectionPoint.LEFT:
        currentPoint = { x: from.x - offsetDistance, y: from.y };
        break;
      case ConnectionPoint.RIGHT:
        currentPoint = { x: from.x + offsetDistance, y: from.y };
        break;
    }
    waypoints.push(currentPoint);
    
    // Route to target
    const targetOffset = { ...to };
    switch (toPoint) {
      case ConnectionPoint.TOP:
        targetOffset.y -= offsetDistance;
        break;
      case ConnectionPoint.BOTTOM:
        targetOffset.y += offsetDistance;
        break;
      case ConnectionPoint.LEFT:
        targetOffset.x -= offsetDistance;
        break;
      case ConnectionPoint.RIGHT:
        targetOffset.x += offsetDistance;
        break;
    }
    
    // Add intermediate waypoints for orthogonal routing
    if (currentPoint.x !== targetOffset.x && currentPoint.y !== targetOffset.y) {
      // Choose routing direction based on connection points
      if ((fromPoint === ConnectionPoint.TOP || fromPoint === ConnectionPoint.BOTTOM) &&
          (toPoint === ConnectionPoint.LEFT || toPoint === ConnectionPoint.RIGHT)) {
        // Route vertically first, then horizontally
        waypoints.push({ x: currentPoint.x, y: targetOffset.y });
        waypoints.push(targetOffset);
      } else {
        // Route horizontally first, then vertically
        waypoints.push({ x: targetOffset.x, y: currentPoint.y });
        waypoints.push(targetOffset);
      }
    } else if (currentPoint.x !== targetOffset.x) {
      waypoints.push({ x: targetOffset.x, y: currentPoint.y });
    } else if (currentPoint.y !== targetOffset.y) {
      waypoints.push({ x: currentPoint.x, y: targetOffset.y });
    }
    
    waypoints.push(to);
  }
  
  return waypoints;
}

// Find the best connection points between two nodes
function findBestConnectionPoints(
  fromNode: PositionedNode,
  toNode: PositionedNode,
  allNodes: PositionedNode[]
): { fromPoint: ConnectionPoint; toPoint: ConnectionPoint } {
  const connectionOptions = [
    ConnectionPoint.TOP,
    ConnectionPoint.BOTTOM,
    ConnectionPoint.LEFT,
    ConnectionPoint.RIGHT
  ];
  
  let bestOption = {
    fromPoint: ConnectionPoint.BOTTOM,
    toPoint: ConnectionPoint.TOP,
    score: Infinity
  };
  
  // Try all combinations of connection points
  for (const fromPoint of connectionOptions) {
    for (const toPoint of connectionOptions) {
      const fromPos = getConnectionPoint(fromNode, fromPoint);
      const toPos = getConnectionPoint(toNode, toPoint);
      
      // Calculate score based on distance and complexity
      const dist = distance(fromPos, toPos);
      const waypoints = generateOrthogonalPath(fromPos, toPos, fromPoint, toPoint, allNodes);
      const complexity = waypoints.length; // Fewer waypoints = simpler path
      
      // Penalize connections that go in opposite directions
      let directionPenalty = 0;
      if ((fromPoint === ConnectionPoint.TOP && toPoint === ConnectionPoint.BOTTOM) ||
          (fromPoint === ConnectionPoint.BOTTOM && toPoint === ConnectionPoint.TOP) ||
          (fromPoint === ConnectionPoint.LEFT && toPoint === ConnectionPoint.RIGHT) ||
          (fromPoint === ConnectionPoint.RIGHT && toPoint === ConnectionPoint.LEFT)) {
        directionPenalty = 1000;
      }
      
      const score = dist + complexity * 50 + directionPenalty;
      
      if (score < bestOption.score) {
        bestOption = { fromPoint, toPoint, score };
      }
    }
  }
  
  return { fromPoint: bestOption.fromPoint, toPoint: bestOption.toPoint };
}

export function calculateDAGLayout(nodes: IdeaNode[]): {
  positionedNodes: PositionedNode[];
  connections: Connection[];
  width: number;
  height: number;
} {
  // Create a map for quick lookups
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  
  // Calculate levels (topological sort)
  const levels: string[][] = [];
  const visited = new Set<string>();
  const inDegree = new Map<string, number>();
  
  // Calculate in-degrees
  nodes.forEach(node => {
    inDegree.set(node.id, node.parentId ? 1 : 0);
  });
  
  // Find nodes with no parents (level 0)
  const queue: string[] = [];
  nodes.forEach(node => {
    if (!node.parentId) {
      queue.push(node.id);
    }
  });
  
  // Process levels
  while (queue.length > 0) {
    const currentLevel: string[] = [];
    const nextQueue: string[] = [];
    
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        currentLevel.push(nodeId);
        
        // Find children and reduce their in-degree
        nodes.forEach(child => {
          if (child.parentId === nodeId) {
            const newInDegree = (inDegree.get(child.id) || 0) - 1;
            inDegree.set(child.id, newInDegree);
            if (newInDegree === 0) {
              nextQueue.push(child.id);
            }
          }
        });
      }
    }
    
    if (currentLevel.length > 0) {
      levels.push(currentLevel);
    }
    
    queue.push(...nextQueue);
  }
  
  // Position nodes
  const positionedNodes: PositionedNode[] = [];
  const nodePositions = new Map<string, { x: number; y: number }>();
  
  levels.forEach((level, levelIndex) => {
    const levelWidth = (level.length - 1) * (CARD_WIDTH + HORIZONTAL_SPACING);
    const startX = -levelWidth / 2;
    
    level.forEach((nodeId, nodeIndex) => {
      const node = nodeMap.get(nodeId)!;
      const x = startX + nodeIndex * (CARD_WIDTH + HORIZONTAL_SPACING);
      const y = levelIndex * LEVEL_SPACING;
      
      nodePositions.set(nodeId, { x, y });
      positionedNodes.push({
        ...node,
        x,
        y,
        level: levelIndex
      });
    });
  });
  
  // Calculate connections with orthogonal routing
  const connections: Connection[] = [];
  nodes.forEach(node => {
    const nodePos = nodePositions.get(node.id);
    if (!nodePos || !node.parentId) return;
    
    const parentPos = nodePositions.get(node.parentId);
    if (!parentPos) return;
    
    const parentNode: PositionedNode = {
      ...nodeMap.get(node.parentId)!,
      x: parentPos.x,
      y: parentPos.y,
      level: 0 // Level doesn't matter for connection calculation
    };
    
    const childNode: PositionedNode = {
      ...node,
      x: nodePos.x,
      y: nodePos.y,
      level: 0 // Level doesn't matter for connection calculation
    };
    
    // Find optimal connection points
    const { fromPoint, toPoint } = findBestConnectionPoints(parentNode, childNode, positionedNodes);
    
    // Get connection coordinates
    const fromPos = getConnectionPoint(parentNode, fromPoint);
    const toPos = getConnectionPoint(childNode, toPoint);
    
    // Generate orthogonal path
    const waypoints = generateOrthogonalPath(fromPos, toPos, fromPoint, toPoint, positionedNodes);
    
    connections.push({
      fromId: node.parentId,
      toId: node.id,
      fromPoint,
      toPoint,
      fromX: fromPos.x,
      fromY: fromPos.y,
      toX: toPos.x,
      toY: toPos.y,
      waypoints
    });
  });
  
  // Calculate bounds
  let minX = 0, maxX = 0, maxY = 0;
  positionedNodes.forEach(node => {
    minX = Math.min(minX, node.x);
    maxX = Math.max(maxX, node.x + CARD_WIDTH);
    maxY = Math.max(maxY, node.y + CARD_HEIGHT);
  });
  
  // Adjust positions to be positive
  const offsetX = Math.abs(minX) + 50;
  positionedNodes.forEach(node => {
    node.x += offsetX;
  });
  connections.forEach(conn => {
    conn.fromX += offsetX;
    conn.toX += offsetX;
    // Also adjust all waypoints
    conn.waypoints.forEach(waypoint => {
      waypoint.x += offsetX;
    });
  });
  
  return {
    positionedNodes,
    connections,
    width: maxX - minX + 100,
    height: maxY + 100
  };
}