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
  // Check if a point is inside a card
  const isPointInsideCard = (point: Position, cardPos: Position) => {
    return point.x >= cardPos.x - 10 && 
           point.x <= cardPos.x + CARD_WIDTH + 10 && 
           point.y >= cardPos.y - 10 && 
           point.y <= cardPos.y + CARD_HEIGHT + 10
  }

  // Get connection points for a card with proper clearance from edges
  const getConnectionPoints = (pos: Position) => ({
    top: { x: pos.x + CARD_WIDTH / 2, y: pos.y - 5 },
    bottom: { x: pos.x + CARD_WIDTH / 2, y: pos.y + CARD_HEIGHT + 5 },
    left: { x: pos.x - 5, y: pos.y + CARD_HEIGHT / 2 },
    right: { x: pos.x + CARD_WIDTH + 5, y: pos.y + CARD_HEIGHT / 2 }
  })

  // Check if a line segment intersects with any card
  const lineIntersectsCards = (start: Position, end: Position) => {
    const allCards = Object.values(allPositions)
    return allCards.some(cardPos => {
      // Skip the cards we're connecting from/to
      if (cardPos === from || cardPos === to) return false
      
      // Simple bounding box intersection check
      const lineMinX = Math.min(start.x, end.x)
      const lineMaxX = Math.max(start.x, end.x)
      const lineMinY = Math.min(start.y, end.y)
      const lineMaxY = Math.max(start.y, end.y)
      
      return !(lineMaxX < cardPos.x || 
               lineMinX > cardPos.x + CARD_WIDTH ||
               lineMaxY < cardPos.y || 
               lineMinY > cardPos.y + CARD_HEIGHT)
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
    
    // Calculate relative position
    const deltaX = to.x - from.x
    const deltaY = to.y - from.y
    const isChildToRight = deltaX > CARD_WIDTH / 2
    const isChildToLeft = deltaX < -CARD_WIDTH / 2
    const isChildAbove = deltaY < -CARD_HEIGHT / 2
    const isChildBelow = deltaY > CARD_HEIGHT / 2
    
    // If parent has multiple children spread horizontally and child is above
    if (hasMultipleChildren && isChildAbove && (isChildToLeft || isChildToRight)) {
      // Use side connections for better branching
      if (isChildToRight) {
        // Connect from right side of parent to bottom of child
        const startPoint = fromPoints.right
        const endPoint = toPoints.bottom
        const clearanceY = from.y - 30 // Go up before turning
        const path = `M ${startPoint.x} ${startPoint.y} L ${startPoint.x + 20} ${startPoint.y} L ${startPoint.x + 20} ${clearanceY} L ${endPoint.x} ${clearanceY} L ${endPoint.x} ${endPoint.y}`
        
        return {
          start: startPoint,
          end: endPoint,
          path: path
        }
      } else if (isChildToLeft) {
        // Connect from left side of parent to bottom of child
        const startPoint = fromPoints.left
        const endPoint = toPoints.bottom
        const clearanceY = from.y - 30 // Go up before turning
        const path = `M ${startPoint.x} ${startPoint.y} L ${startPoint.x - 20} ${startPoint.y} L ${startPoint.x - 20} ${clearanceY} L ${endPoint.x} ${clearanceY} L ${endPoint.x} ${endPoint.y}`
        
        return {
          start: startPoint,
          end: endPoint,
          path: path
        }
      }
    }
    
    // Try different connection combinations with adjusted priorities
    const connectionOptions = [
      { from: fromPoints.bottom, to: toPoints.top, priority: 1 }, // Preferred: child above parent
      { from: fromPoints.top, to: toPoints.bottom, priority: 2 }, // Parent above child
      { from: fromPoints.right, to: toPoints.left, priority: 3 }, // Horizontal connections
      { from: fromPoints.left, to: toPoints.right, priority: 3 },
      { from: fromPoints.top, to: toPoints.left, priority: 4 }, // Diagonal connections
      { from: fromPoints.top, to: toPoints.right, priority: 4 },
      { from: fromPoints.bottom, to: toPoints.left, priority: 4 },
      { from: fromPoints.bottom, to: toPoints.right, priority: 4 },
      { from: fromPoints.left, to: toPoints.top, priority: 4 },
      { from: fromPoints.left, to: toPoints.bottom, priority: 4 },
      { from: fromPoints.right, to: toPoints.top, priority: 4 },
      { from: fromPoints.right, to: toPoints.bottom, priority: 4 }
    ]

    // Sort by priority and test for intersections
    connectionOptions.sort((a, b) => a.priority - b.priority)
    
    for (const option of connectionOptions) {
      const startPoint = option.from
      const endPoint = option.to
      
      // For straight lines, check direct connection
      if (Math.abs(startPoint.x - endPoint.x) < 5 || Math.abs(startPoint.y - endPoint.y) < 5) {
        if (!lineIntersectsCards(startPoint, endPoint)) {
          return {
            start: startPoint,
            end: endPoint,
            path: `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`
          }
        }
      }
      
      // For orthogonal routing
      const midX = startPoint.x + (endPoint.x - startPoint.x) / 2
      const midY = startPoint.y + (endPoint.y - startPoint.y) / 2
      
      // For vertical connections, add clearance from card edges
      if (Math.abs(startPoint.x - endPoint.x) < 5) {
        // Straight vertical line - add some clearance
        const clearanceDistance = 25
        let adjustedStartY = startPoint.y
        let adjustedEndY = endPoint.y
        
        if (startPoint.y < endPoint.y) {
          // Parent above child
          adjustedStartY = startPoint.y + clearanceDistance
          adjustedEndY = endPoint.y - clearanceDistance
        } else {
          // Child above parent  
          adjustedStartY = startPoint.y - clearanceDistance
          adjustedEndY = endPoint.y + clearanceDistance
        }
        
        const path = `M ${startPoint.x} ${startPoint.y} L ${startPoint.x} ${adjustedStartY} L ${startPoint.x} ${adjustedEndY} L ${endPoint.x} ${endPoint.y}`
        
        if (!lineIntersectsCards({ x: startPoint.x, y: adjustedStartY }, { x: startPoint.x, y: adjustedEndY })) {
          return {
            start: startPoint,
            end: endPoint,
            path: path
          }
        }
      }
      
      // Try L-shaped path (horizontal first, then vertical)
      const horizontalFirst = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`
      if (!lineIntersectsCards({ x: startPoint.x, y: startPoint.y }, { x: endPoint.x, y: startPoint.y }) &&
          !lineIntersectsCards({ x: endPoint.x, y: startPoint.y }, { x: endPoint.x, y: endPoint.y })) {
        return {
          start: startPoint,
          end: endPoint,
          path: horizontalFirst
        }
      }
      
      // Try L-shaped path (vertical first, then horizontal)
      const verticalFirst = `M ${startPoint.x} ${startPoint.y} L ${startPoint.x} ${endPoint.y} L ${endPoint.x} ${endPoint.y}`
      if (!lineIntersectsCards({ x: startPoint.x, y: startPoint.y }, { x: startPoint.x, y: endPoint.y }) &&
          !lineIntersectsCards({ x: startPoint.x, y: endPoint.y }, { x: endPoint.x, y: endPoint.y })) {
        return {
          start: startPoint,
          end: endPoint,
          path: verticalFirst
        }
      }
      
      // Try stepped path with better clearance
      const clearanceDistance = 35
      const steppedPath = `M ${startPoint.x} ${startPoint.y} L ${startPoint.x} ${midY - clearanceDistance} L ${endPoint.x} ${midY - clearanceDistance} L ${endPoint.x} ${endPoint.y}`
      if (!lineIntersectsCards({ x: startPoint.x, y: startPoint.y }, { x: startPoint.x, y: midY - clearanceDistance }) &&
          !lineIntersectsCards({ x: startPoint.x, y: midY - clearanceDistance }, { x: endPoint.x, y: midY - clearanceDistance }) &&
          !lineIntersectsCards({ x: endPoint.x, y: midY - clearanceDistance }, { x: endPoint.x, y: endPoint.y })) {
        return {
          start: startPoint,
          end: endPoint,
          path: steppedPath
        }
      }
    }
    
    // Fallback to default connection with clearance
    const fallbackStart = fromPoints.bottom
    const fallbackEnd = toPoints.top
    const clearanceDistance = 35
    const fallbackMidY = fallbackStart.y + clearanceDistance
    
    return {
      start: fallbackStart,
      end: fallbackEnd,
      path: `M ${fallbackStart.x} ${fallbackStart.y} L ${fallbackStart.x} ${fallbackMidY} L ${fallbackEnd.x} ${fallbackMidY} L ${fallbackEnd.x} ${fallbackEnd.y}`
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