"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Button } from './ui/button'

interface Idea {
  id: string
  title: string
  creator: string
  parentId?: string // Each idea can only be remixed from one parent
}

interface Position {
  x: number
  y: number
}

const CARD_WIDTH = 280
const CARD_HEIGHT = 100
const MIN_HORIZONTAL_SPACING = 25
const VERTICAL_SPACING = 45

const creatorColors = {
  'Anna Baranova': 'bg-blue-50 border-blue-200',
  'Anton Sukhonos­enko': 'bg-green-50 border-green-200',
  'Sarah Chen': 'bg-purple-50 border-purple-200',
  'Mike Johnson': 'bg-orange-50 border-orange-200',
  'default': 'bg-gray-50 border-gray-200'
}

const sampleDatasets = {
  linear: [
    { id: '1', title: 'Initial Idea: AI-Powered Code Assistant', creator: 'Anna Baranova' },
    { id: '2', title: 'Add Voice Commands Integration', creator: 'Anton Sukhonos­enko', parentId: '1' },
    { id: '3', title: 'Implement Multi-Language Support', creator: 'Sarah Chen', parentId: '2' },
    { id: '4', title: 'Add Real-time Collaboration Features', creator: 'Mike Johnson', parentId: '3' }
  ],
  branching: [
    { id: '1', title: 'Core Platform Architecture', creator: 'Anna Baranova' },
    { id: '2', title: 'Frontend React Components', creator: 'Anton Sukhonos­enko', parentId: '1' },
    { id: '3', title: 'Backend API Services', creator: 'Sarah Chen', parentId: '1' },
    { id: '4', title: 'Database Schema Design', creator: 'Mike Johnson', parentId: '1' },
    { id: '5', title: 'User Authentication Module', creator: 'Anna Baranova', parentId: '2' },
    { id: '6', title: 'Data Analytics Dashboard', creator: 'Anton Sukhonos­enko', parentId: '3' }
  ],
  complex: [
    { id: '1', title: 'Product Vision: Smart Workspace', creator: 'Anna Baranova' },
    { id: '2', title: 'AI Assistant Integration', creator: 'Anton Sukhonos­enko', parentId: '1' },
    { id: '3', title: 'Team Collaboration Hub', creator: 'Sarah Chen', parentId: '1' },
    { id: '4', title: 'Voice-Activated Commands', creator: 'Mike Johnson', parentId: '2' },
    { id: '5', title: 'Smart Document Processing', creator: 'Anna Baranova', parentId: '2' },
    { id: '6', title: 'Real-time Video Integration', creator: 'Anton Sukhonos­enko', parentId: '3' },
    { id: '7', title: 'Advanced Search & Filter', creator: 'Sarah Chen', parentId: '3' },
    { id: '8', title: 'Mobile App Companion', creator: 'Mike Johnson', parentId: '4' },
    { id: '9', title: 'Unified Communication Platform', creator: 'Anna Baranova', parentId: '6' },
    { id: '10', title: 'Cross-Platform Sync', creator: 'Anton Sukhonos­enko', parentId: '8' }
  ],
  diamond: [
    { id: '1', title: 'Initial Research Phase', creator: 'Anna Baranova' },
    { id: '2', title: 'User Interface Design', creator: 'Anton Sukhonos­enko', parentId: '1' },
    { id: '3', title: 'Backend Development', creator: 'Sarah Chen', parentId: '1' },
    { id: '4', title: 'Integration & Testing', creator: 'Mike Johnson', parentId: '2' }
  ]
}

function IdeaCard({ idea, position }: { idea: Idea; position: Position }) {
  const colorClass = creatorColors[idea.creator as keyof typeof creatorColors] || creatorColors.default

  return (
    <div
      className={`absolute ${colorClass} rounded-lg border shadow-sm p-4 transition-all duration-200 hover:shadow-md`}
      style={{
        left: position.x,
        top: position.y,
        width: CARD_WIDTH,
        height: CARD_HEIGHT
      }}
    >
      <h3 className="text-sm font-medium text-gray-900 mb-2 leading-tight">{idea.title}</h3>
      <div className="flex items-center text-xs text-gray-500">
        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
        <span>{idea.creator}</span>
      </div>
    </div>
  )
}

function ConnectionLine({ from, to, allPositions, allIdeas }: { from: Position; to: Position; allPositions: Record<string, Position>; allIdeas: Idea[] }) {
  // Get connection points for a card with proper clearance from edges
  const getConnectionPoints = (pos: Position) => ({
    top: { x: pos.x + CARD_WIDTH / 2, y: pos.y - 5 },
    bottom: { x: pos.x + CARD_WIDTH / 2, y: pos.y + CARD_HEIGHT + 5 },
    left: { x: pos.x - 5, y: pos.y + CARD_HEIGHT / 2 },
    right: { x: pos.x + CARD_WIDTH + 5, y: pos.y + CARD_HEIGHT / 2 }
  })

  // Improved line-rectangle intersection detection
  const lineIntersectsCard = (start: Position, end: Position, cardPos: Position) => {
    // Add padding to make intersection detection more conservative
    const padding = 15
    const cardLeft = cardPos.x - padding
    const cardRight = cardPos.x + CARD_WIDTH + padding
    const cardTop = cardPos.y - padding
    const cardBottom = cardPos.y + CARD_HEIGHT + padding
    
    // Use proper line-rectangle intersection algorithm
    const x1 = start.x, y1 = start.y
    const x2 = end.x, y2 = end.y
    
    // Check if line endpoints are inside the padded rectangle
    const startInside = x1 >= cardLeft && x1 <= cardRight && y1 >= cardTop && y1 <= cardBottom
    const endInside = x2 >= cardLeft && x2 <= cardRight && y2 >= cardTop && y2 <= cardBottom
    
    if (startInside || endInside) return true
    
    // Check if line intersects any of the rectangle edges
    const intersectsEdge = (ax1: number, ay1: number, ax2: number, ay2: number, bx1: number, by1: number, bx2: number, by2: number) => {
      const denom = (ax2 - ax1) * (by2 - by1) - (ay2 - ay1) * (bx2 - bx1)
      if (Math.abs(denom) < 1e-10) return false // Lines are parallel
      
      const t = ((bx1 - ax1) * (by2 - by1) - (by1 - ay1) * (bx2 - bx1)) / denom
      const u = ((bx1 - ax1) * (ay2 - ay1) - (by1 - ay1) * (ax2 - ax1)) / denom
      
      return t >= 0 && t <= 1 && u >= 0 && u <= 1
    }
    
    // Check intersection with all four edges of the rectangle
    return intersectsEdge(x1, y1, x2, y2, cardLeft, cardTop, cardRight, cardTop) ||    // Top edge
           intersectsEdge(x1, y1, x2, y2, cardRight, cardTop, cardRight, cardBottom) || // Right edge
           intersectsEdge(x1, y1, x2, y2, cardRight, cardBottom, cardLeft, cardBottom) || // Bottom edge
           intersectsEdge(x1, y1, x2, y2, cardLeft, cardBottom, cardLeft, cardTop)       // Left edge
  }

  // Check if a line segment intersects with any card
  const lineIntersectsCards = (start: Position, end: Position) => {
    return Object.values(allPositions).some(cardPos => {
      // Skip the cards we're connecting from/to
      if (cardPos === from || cardPos === to) return false
      return lineIntersectsCard(start, end, cardPos)
    })
  }

  // Find the best connection points and route
  const findBestRoute = () => {
    const fromPoints = getConnectionPoints(from)
    const toPoints = getConnectionPoints(to)
    
    // Get the parent ID from the position
    const parentId = Object.entries(allPositions).find(([id, pos]) => pos === from)?.[0]
    
    // Get all children of this parent
    const childrenOfParent = allIdeas.filter(idea => idea.parentId === parentId)
    const hasMultipleChildren = childrenOfParent.length > 1
    
    // Calculate relative position and distances
    const deltaX = to.x - from.x
    const deltaY = to.y - from.y
    const centerToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    // Determine optimal connection strategy based on card positions
    const isChildToRight = deltaX > CARD_WIDTH * 0.3
    const isChildToLeft = deltaX < -CARD_WIDTH * 0.3
    const isChildAbove = deltaY < -CARD_HEIGHT * 0.3
    const isChildBelow = deltaY > CARD_HEIGHT * 0.3
    const isAlmostHorizontal = Math.abs(deltaY) < CARD_HEIGHT * 0.5
    const isAlmostVertical = Math.abs(deltaX) < CARD_WIDTH * 0.5
    // Smart connection point selection based on card positions
    let bestConnections = []
    
    // Priority 1: For multiple children, use side connections when appropriate
    if (hasMultipleChildren && isChildAbove && (isChildToLeft || isChildToRight)) {
      if (isChildToRight) {
        bestConnections.push({ from: fromPoints.right, to: toPoints.bottom })
        bestConnections.push({ from: fromPoints.right, to: toPoints.left })
      } else if (isChildToLeft) {
        bestConnections.push({ from: fromPoints.left, to: toPoints.bottom })
        bestConnections.push({ from: fromPoints.left, to: toPoints.right })
      }
    }
    
    // Priority 2: For horizontal layouts, prefer side connections
    if (isAlmostHorizontal) {
      if (isChildToRight) {
        bestConnections.push({ from: fromPoints.right, to: toPoints.left })
        bestConnections.push({ from: fromPoints.right, to: toPoints.bottom })
        bestConnections.push({ from: fromPoints.right, to: toPoints.top })
      } else if (isChildToLeft) {
        bestConnections.push({ from: fromPoints.left, to: toPoints.right })
        bestConnections.push({ from: fromPoints.left, to: toPoints.bottom })
        bestConnections.push({ from: fromPoints.left, to: toPoints.top })
      }
    }
    
    // Priority 3: For vertical layouts, prefer top/bottom connections
    if (isAlmostVertical) {
      if (isChildAbove) {
        bestConnections.push({ from: fromPoints.top, to: toPoints.bottom })
      } else if (isChildBelow) {
        bestConnections.push({ from: fromPoints.bottom, to: toPoints.top })
      }
    }
    
    // Priority 4: Standard combinations based on relative position
    if (isChildAbove) {
      bestConnections.push(
        { from: fromPoints.top, to: toPoints.bottom },
        { from: fromPoints.right, to: toPoints.left },
        { from: fromPoints.left, to: toPoints.right }
      )
    } else if (isChildBelow) {
      bestConnections.push(
        { from: fromPoints.bottom, to: toPoints.top },
        { from: fromPoints.right, to: toPoints.left },
        { from: fromPoints.left, to: toPoints.right }
      )
    }
    
    // Priority 5: All other combinations as fallback
    const allCombinations = [
      { from: fromPoints.bottom, to: toPoints.top },
      { from: fromPoints.top, to: toPoints.bottom },
      { from: fromPoints.right, to: toPoints.left },
      { from: fromPoints.left, to: toPoints.right },
      { from: fromPoints.right, to: toPoints.bottom },
      { from: fromPoints.left, to: toPoints.bottom },
      { from: fromPoints.right, to: toPoints.top },
      { from: fromPoints.left, to: toPoints.top },
      { from: fromPoints.bottom, to: toPoints.left },
      { from: fromPoints.bottom, to: toPoints.right },
      { from: fromPoints.top, to: toPoints.left },
      { from: fromPoints.top, to: toPoints.right }
    ]
    
    // Add remaining combinations that aren't already in bestConnections
    allCombinations.forEach(combo => {
      const exists = bestConnections.some(bc => 
        bc.from.x === combo.from.x && bc.from.y === combo.from.y &&
        bc.to.x === combo.to.x && bc.to.y === combo.to.y
      )
      if (!exists) {
        bestConnections.push(combo)
      }
    })
    
    // Test each connection option
    for (const { from: startPoint, to: endPoint } of bestConnections) {
      // Try direct connection first (for very close cards or when no obstacles)
      if (!lineIntersectsCards(startPoint, endPoint)) {
        return {
          start: startPoint,
          end: endPoint,
          path: `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`
        }
      }
      
      // Try L-shaped paths with minimal direction changes
      
      // Horizontal first, then vertical
      const midPoint1 = { x: endPoint.x, y: startPoint.y }
      if (!lineIntersectsCards(startPoint, midPoint1) && !lineIntersectsCards(midPoint1, endPoint)) {
        return {
          start: startPoint,
          end: endPoint,
          path: `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`
        }
      }
      
      // Vertical first, then horizontal
      const midPoint2 = { x: startPoint.x, y: endPoint.y }
      if (!lineIntersectsCards(startPoint, midPoint2) && !lineIntersectsCards(midPoint2, endPoint)) {
        return {
          start: startPoint,
          end: endPoint,
          path: `M ${startPoint.x} ${startPoint.y} L ${startPoint.x} ${endPoint.y} L ${endPoint.x} ${endPoint.y}`
        }
      }
    }
    
    // Final fallback: try a stepped route with more clearance
    const fallbackStart = fromPoints.bottom
    const fallbackEnd = toPoints.top
    const clearanceDistance = 40
    
    // Try stepped routing with waypoints to avoid obstacles
    const waypoint1Y = fallbackStart.y + clearanceDistance
    const waypoint2Y = fallbackEnd.y - clearanceDistance
    
    const steppedPath = `M ${fallbackStart.x} ${fallbackStart.y} L ${fallbackStart.x} ${waypoint1Y} L ${fallbackEnd.x} ${waypoint1Y} L ${fallbackEnd.x} ${fallbackEnd.y}`
    
    return {
      start: fallbackStart,
      end: fallbackEnd,
      path: steppedPath
    }
  }

  const route = findBestRoute()

  return (
    <g>
      <path
        d={route.path}
        fill="none"
        stroke="#E0E0E0"
        strokeWidth="2"
        className="transition-all duration-200 hover:stroke-gray-400"
        markerEnd="url(#arrowhead)"
      />
    </g>
  )
}

function calculateLayout(ideas: Idea[], containerWidth: number): Record<string, Position> {
  const positions: Record<string, Position> = {}
  const levels: Record<string, number> = {}
  const levelNodes: Record<number, string[]> = {}

  // Calculate levels using topological sort
  const visited = new Set<string>()
  const visiting = new Set<string>()
  
  function calculateLevel(nodeId: string): number {
    if (visiting.has(nodeId)) return 0 // Cycle detection
    if (visited.has(nodeId)) return levels[nodeId]
    
    visiting.add(nodeId)
    
    const node = ideas.find(n => n.id === nodeId)
    if (!node || !node.parentId) {
      levels[nodeId] = 0
    } else {
      levels[nodeId] = calculateLevel(node.parentId) + 1
    }
    
    visiting.delete(nodeId)
    visited.add(nodeId)
    return levels[nodeId]
  }

  // Calculate levels for all nodes
  ideas.forEach(idea => calculateLevel(idea.id))

  // Group nodes by level
  Object.entries(levels).forEach(([nodeId, level]) => {
    if (!levelNodes[level]) levelNodes[level] = []
    levelNodes[level].push(nodeId)
  })

  // Find the maximum level to invert the layout
  const maxLevel = Math.max(...Object.values(levels))

  // Calculate responsive layout
  const availableWidth = Math.max(containerWidth - 100, 400) // Leave some margin
  let currentY = 50

  // Position nodes (inverted: root ideas at bottom, remixes grow upward)
  const levelYPositions: Record<number, number> = {}
  
  Object.entries(levelNodes)
    .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Start from highest level (top)
    .forEach(([levelStr, nodeIds]) => {
      const level = parseInt(levelStr)
      
      // Calculate how many cards can fit in one row
      const maxCardsPerRow = Math.floor((availableWidth + MIN_HORIZONTAL_SPACING) / (CARD_WIDTH + MIN_HORIZONTAL_SPACING))
      const cardsPerRow = Math.min(nodeIds.length, Math.max(1, maxCardsPerRow))
      const rows = Math.ceil(nodeIds.length / cardsPerRow)
      
      // Calculate actual horizontal spacing
      const actualHorizontalSpacing = cardsPerRow > 1 
        ? Math.max(MIN_HORIZONTAL_SPACING, (availableWidth - cardsPerRow * CARD_WIDTH) / (cardsPerRow - 1))
        : MIN_HORIZONTAL_SPACING
      
      levelYPositions[level] = currentY
      
      nodeIds.forEach((nodeId, index) => {
        const row = Math.floor(index / cardsPerRow)
        const col = index % cardsPerRow
        const cardsInThisRow = Math.min(cardsPerRow, nodeIds.length - row * cardsPerRow)
        
        // Center the row
        const rowWidth = cardsInThisRow * CARD_WIDTH + (cardsInThisRow - 1) * actualHorizontalSpacing
        const startX = (availableWidth - rowWidth) / 2 + 50
        const x = startX + col * (CARD_WIDTH + actualHorizontalSpacing)
        const y = currentY + row * (CARD_HEIGHT + 15) // Extra spacing between rows within same level
        
        positions[nodeId] = { x, y }
      })
      
      // Update currentY for next level
      currentY += rows * (CARD_HEIGHT + 15) + VERTICAL_SPACING
    })

  return positions
}

export default function IdeasDAG() {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof sampleDatasets>('complex')
  const [containerWidth, setContainerWidth] = useState(800)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const currentIdeas = sampleDatasets[selectedDataset]
  const positions = useMemo(() => calculateLayout(currentIdeas, containerWidth), [currentIdeas, containerWidth])
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  
  const svgBounds = useMemo(() => {
    const allPositions = Object.values(positions)
    if (allPositions.length === 0) return { width: containerWidth, height: 600 }
    
    const minX = Math.min(...allPositions.map(p => p.x)) - 50
    const maxX = Math.max(...allPositions.map(p => p.x + CARD_WIDTH)) + 50
    const minY = Math.min(...allPositions.map(p => p.y)) - 50
    const maxY = Math.max(...allPositions.map(p => p.y + CARD_HEIGHT)) + 50
    
    return {
      width: Math.max(containerWidth, maxX - minX),
      height: Math.max(600, maxY - minY),
      offsetX: Math.max(0, -minX),
      offsetY: Math.max(0, -minY)
    }
  }, [positions, containerWidth])

  return (
    <div className="w-full">
      <div className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ideas DAG Visualizer</h1>
          <p className="text-gray-600">Explore different idea dependency structures and see how they connect.</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {Object.keys(sampleDatasets).map((dataset) => (
            <Button
              key={dataset}
              variant={selectedDataset === dataset ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDataset(dataset as keyof typeof sampleDatasets)}
              className="capitalize"
            >
              {dataset}
            </Button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="border rounded-lg bg-white overflow-auto">
        <div 
          className="relative"
          style={{
            width: '100%',
            height: svgBounds.height,
            minHeight: '400px'
          }}
        >
          {/* SVG for connection lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height={svgBounds.height}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="4"
                refX="5"
                refY="2"
                orient="auto"
                fill="#E0E0E0"
              >
                <polyline points="0,0 5,2 0,4" fill="none" stroke="#E0E0E0" strokeWidth="1" />
              </marker>
            </defs>
            <g transform={`translate(${svgBounds.offsetX || 0}, ${svgBounds.offsetY || 0})`}>
              {currentIdeas
                .filter(idea => idea.parentId)
                .map(idea => (
                  <ConnectionLine
                    key={`${idea.parentId}-${idea.id}`}
                    from={positions[idea.parentId!]}
                    to={positions[idea.id]}
                    allPositions={positions}
                    allIdeas={currentIdeas}
                  />
                ))}
            </g>
          </svg>

          {/* Idea cards */}
          <div 
            className="relative"
            style={{
              transform: `translate(${svgBounds.offsetX || 0}px, ${svgBounds.offsetY || 0}px)`
            }}
          >
            {currentIdeas.map(idea => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                position={positions[idea.id]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}