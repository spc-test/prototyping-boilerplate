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
  color: string;
}

const CARD_WIDTH = 240;
const CARD_HEIGHT = 80;
const LEVEL_SPACING = 120;
const HORIZONTAL_SPACING = 60;
const CONNECTION_OFFSET = 40; // Minimum distance from card edge for routing

// Generate a distinct color for each connection
function generateConnectionColor(index: number): string {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#A855F7', // Violet
    '#F472B6', // Rose
    '#22D3EE', // Light Blue
    '#65A30D', // Green-600
    '#DC2626', // Red-600
    '#7C3AED', // Purple-600
    '#DB2777', // Pink-600
    '#0891B2', // Cyan-600
    '#CA8A04'  // Yellow-600
  ];
  
  return colors[index % colors.length];
}

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

// Check if a point is inside a card (with margin)
function isPointInCard(point: { x: number; y: number }, card: PositionedNode, margin: number = 20): boolean {
  return point.x >= card.x - margin && 
         point.x <= card.x + CARD_WIDTH + margin && 
         point.y >= card.y - margin && 
         point.y <= card.y + CARD_HEIGHT + margin;
}

// Check if a line segment intersects with any card
function lineIntersectsCards(
  p1: { x: number; y: number }, 
  p2: { x: number; y: number }, 
  cards: PositionedNode[], 
  excludeIds: string[] = []
): boolean {
  for (const card of cards) {
    if (excludeIds.includes(card.id)) continue;
    
    // Check if line passes through card area
    const cardLeft = card.x - 10;
    const cardRight = card.x + CARD_WIDTH + 10;
    const cardTop = card.y - 10;
    const cardBottom = card.y + CARD_HEIGHT + 10;
    
    // For horizontal lines
    if (p1.y === p2.y) {
      const y = p1.y;
      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      
      if (y >= cardTop && y <= cardBottom && maxX >= cardLeft && minX <= cardRight) {
        return true;
      }
    }
    
    // For vertical lines
    if (p1.x === p2.x) {
      const x = p1.x;
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);
      
      if (x >= cardLeft && x <= cardRight && maxY >= cardTop && minY <= cardBottom) {
        return true;
      }
    }
  }
  
  return false;
}

// Generate orthogonal path between two connection points
function generateOrthogonalPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromPoint: ConnectionPoint,
  toPoint: ConnectionPoint,
  allNodes: PositionedNode[],
  fromNodeId: string,
  toNodeId: string
): { x: number; y: number }[] {
  const waypoints: { x: number; y: number }[] = [];
  const excludeIds = [fromNodeId, toNodeId];
  
  // Add starting point
  waypoints.push(from);
  
  // Calculate intermediate waypoints based on connection directions
  if (fromPoint === ConnectionPoint.BOTTOM && toPoint === ConnectionPoint.TOP) {
    // Vertical connection - check if direct path is clear
    if (from.x === to.x) {
      // Check if direct vertical line intersects any cards
      if (!lineIntersectsCards(from, to, allNodes, excludeIds)) {
        waypoints.push(to);
      } else {
        // Route around obstacles
        const midY = from.y + (to.y - from.y) / 2;
        const offset = CONNECTION_OFFSET;
        waypoints.push({ x: from.x, y: from.y + offset });
        waypoints.push({ x: from.x + offset * 2, y: from.y + offset });
        waypoints.push({ x: from.x + offset * 2, y: to.y - offset });
        waypoints.push({ x: to.x, y: to.y - offset });
        waypoints.push(to);
      }
    } else {
      // L-shaped connection with clearance
      const midY = from.y + Math.max(CONNECTION_OFFSET, (to.y - from.y) / 2);
      const waypoint1 = { x: from.x, y: midY };
      const waypoint2 = { x: to.x, y: midY };
      
      // Check if horizontal segment intersects cards
      if (!lineIntersectsCards(waypoint1, waypoint2, allNodes, excludeIds)) {
        waypoints.push(waypoint1);
        waypoints.push(waypoint2);
      } else {
        // Route with extra clearance
        const clearY = midY + CONNECTION_OFFSET;
        waypoints.push({ x: from.x, y: clearY });
        waypoints.push({ x: to.x, y: clearY });
      }
      waypoints.push(to);
    }
  } else if (fromPoint === ConnectionPoint.RIGHT && toPoint === ConnectionPoint.LEFT) {
    // Horizontal connection
    if (from.y === to.y) {
      // Check if direct horizontal line is clear
      if (!lineIntersectsCards(from, to, allNodes, excludeIds)) {
        waypoints.push(to);
      } else {
        // Route around with vertical offset
        const offset = CONNECTION_OFFSET;
        waypoints.push({ x: from.x + offset, y: from.y });
        waypoints.push({ x: from.x + offset, y: from.y - offset * 2 });
        waypoints.push({ x: to.x - offset, y: from.y - offset * 2 });
        waypoints.push({ x: to.x - offset, y: to.y });
        waypoints.push(to);
      }
    } else {
      // L-shaped connection
      const midX = from.x + Math.max(CONNECTION_OFFSET, (to.x - from.x) / 2);
      const waypoint1 = { x: midX, y: from.y };
      const waypoint2 = { x: midX, y: to.y };
      
      if (!lineIntersectsCards(waypoint1, waypoint2, allNodes, excludeIds)) {
        waypoints.push(waypoint1);
        waypoints.push(waypoint2);
      } else {
        const clearX = midX + CONNECTION_OFFSET;
        waypoints.push({ x: clearX, y: from.y });
        waypoints.push({ x: clearX, y: to.y });
      }
      waypoints.push(to);
    }
  } else {
    // Complex routing with proper offset and clearance
    const offsetDistance = CONNECTION_OFFSET;
    
    // Create offset points that are guaranteed to be outside card boundaries
    let startOffset = { ...from };
    switch (fromPoint) {
      case ConnectionPoint.TOP:
        startOffset = { x: from.x, y: from.y - offsetDistance };
        break;
      case ConnectionPoint.BOTTOM:
        startOffset = { x: from.x, y: from.y + offsetDistance };
        break;
      case ConnectionPoint.LEFT:
        startOffset = { x: from.x - offsetDistance, y: from.y };
        break;
      case ConnectionPoint.RIGHT:
        startOffset = { x: from.x + offsetDistance, y: from.y };
        break;
    }
    waypoints.push(startOffset);
    
    let endOffset = { ...to };
    switch (toPoint) {
      case ConnectionPoint.TOP:
        endOffset = { x: to.x, y: to.y - offsetDistance };
        break;
      case ConnectionPoint.BOTTOM:
        endOffset = { x: to.x, y: to.y + offsetDistance };
        break;
      case ConnectionPoint.LEFT:
        endOffset = { x: to.x - offsetDistance, y: to.y };
        break;
      case ConnectionPoint.RIGHT:
        endOffset = { x: to.x + offsetDistance, y: to.y };
        break;
    }
    
    // Route between offset points with collision avoidance
    if (startOffset.x !== endOffset.x && startOffset.y !== endOffset.y) {
      // Determine routing priority based on connection points
      if ((fromPoint === ConnectionPoint.TOP || fromPoint === ConnectionPoint.BOTTOM) &&
          (toPoint === ConnectionPoint.LEFT || toPoint === ConnectionPoint.RIGHT)) {
        // Route vertically first, then horizontally
        const intermediate = { x: startOffset.x, y: endOffset.y };
        if (!lineIntersectsCards(startOffset, intermediate, allNodes, excludeIds) &&
            !lineIntersectsCards(intermediate, endOffset, allNodes, excludeIds)) {
          waypoints.push(intermediate);
        } else {
          // Use alternative routing with extra clearance
          const clearY = endOffset.y + (endOffset.y > startOffset.y ? offsetDistance : -offsetDistance);
          waypoints.push({ x: startOffset.x, y: clearY });
          waypoints.push({ x: endOffset.x, y: clearY });
        }
      } else {
        // Route horizontally first, then vertically
        const intermediate = { x: endOffset.x, y: startOffset.y };
        if (!lineIntersectsCards(startOffset, intermediate, allNodes, excludeIds) &&
            !lineIntersectsCards(intermediate, endOffset, allNodes, excludeIds)) {
          waypoints.push(intermediate);
        } else {
          // Use alternative routing with extra clearance
          const clearX = endOffset.x + (endOffset.x > startOffset.x ? offsetDistance : -offsetDistance);
          waypoints.push({ x: clearX, y: startOffset.y });
          waypoints.push({ x: clearX, y: endOffset.y });
        }
      }
    }
    
    waypoints.push(endOffset);
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
  let connectionIndex = 0;
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
    const waypoints = generateOrthogonalPath(fromPos, toPos, fromPoint, toPoint, positionedNodes, node.parentId, node.id);
    
    connections.push({
      fromId: node.parentId,
      toId: node.id,
      fromPoint,
      toPoint,
      fromX: fromPos.x,
      fromY: fromPos.y,
      toX: toPos.x,
      toY: toPos.y,
      waypoints,
      color: generateConnectionColor(connectionIndex++)
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