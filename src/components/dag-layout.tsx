export interface IdeaNode {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  status: 'default' | 'active' | 'completed';
  parentIds: string[];
}

export interface PositionedNode extends IdeaNode {
  x: number;
  y: number;
  level: number;
}

export interface Connection {
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const CARD_WIDTH = 240;
const CARD_HEIGHT = 80;
const LEVEL_SPACING = 120;
const HORIZONTAL_SPACING = 60;

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
    inDegree.set(node.id, node.parentIds.length);
  });
  
  // Find nodes with no parents (level 0)
  const queue: string[] = [];
  nodes.forEach(node => {
    if (node.parentIds.length === 0) {
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
          if (child.parentIds.includes(nodeId)) {
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
  
  // Calculate connections
  const connections: Connection[] = [];
  nodes.forEach(node => {
    const nodePos = nodePositions.get(node.id);
    if (!nodePos) return;
    
    node.parentIds.forEach(parentId => {
      const parentPos = nodePositions.get(parentId);
      if (!parentPos) return;
      
      connections.push({
        fromId: parentId,
        toId: node.id,
        fromX: parentPos.x + CARD_WIDTH / 2,
        fromY: parentPos.y + CARD_HEIGHT,
        toX: nodePos.x + CARD_WIDTH / 2,
        toY: nodePos.y
      });
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
  });
  
  return {
    positionedNodes,
    connections,
    width: maxX - minX + 100,
    height: maxY + 100
  };
}