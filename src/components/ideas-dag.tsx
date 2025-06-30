"use client"

import React, { useState, useMemo } from 'react'
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
const HORIZONTAL_SPACING = 100
const VERTICAL_SPACING = 120

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

function ConnectionLine({ from, to }: { from: Position; to: Position }) {
  const fromX = from.x + CARD_WIDTH / 2
  const fromY = from.y + CARD_HEIGHT
  const toX = to.x + CARD_WIDTH / 2
  const toY = to.y

  const midY = fromY + (toY - fromY) / 2
  
  const pathData = `M ${fromX} ${fromY} C ${fromX} ${midY} ${toX} ${midY} ${toX} ${toY}`

  return (
    <g>
      <path
        d={pathData}
        fill="none"
        stroke="#E0E0E0"
        strokeWidth="2"
        className="transition-all duration-200 hover:stroke-gray-400"
        markerEnd="url(#arrowhead)"
      />
    </g>
  )
}

function calculateLayout(ideas: Idea[]): Record<string, Position> {
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

  // Position nodes
  Object.entries(levelNodes).forEach(([levelStr, nodeIds]) => {
    const level = parseInt(levelStr)
    const y = level * VERTICAL_SPACING + 50
    
    nodeIds.forEach((nodeId, index) => {
      const totalWidth = nodeIds.length * CARD_WIDTH + (nodeIds.length - 1) * HORIZONTAL_SPACING
      const startX = -totalWidth / 2 + 400 // Center around x=400
      const x = startX + index * (CARD_WIDTH + HORIZONTAL_SPACING)
      
      positions[nodeId] = { x, y }
    })
  })

  return positions
}

export default function IdeasDAG() {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof sampleDatasets>('complex')
  
  const currentIdeas = sampleDatasets[selectedDataset]
  const positions = useMemo(() => calculateLayout(currentIdeas), [currentIdeas])
  
  const svgBounds = useMemo(() => {
    const allPositions = Object.values(positions)
    if (allPositions.length === 0) return { width: 800, height: 600 }
    
    const minX = Math.min(...allPositions.map(p => p.x)) - 50
    const maxX = Math.max(...allPositions.map(p => p.x + CARD_WIDTH)) + 50
    const minY = Math.min(...allPositions.map(p => p.y)) - 50
    const maxY = Math.max(...allPositions.map(p => p.y + CARD_HEIGHT)) + 50
    
    return {
      width: Math.max(800, maxX - minX),
      height: Math.max(600, maxY - minY),
      offsetX: Math.max(0, -minX),
      offsetY: Math.max(0, -minY)
    }
  }, [positions])

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

      <div className="border rounded-lg bg-white overflow-auto">
        <div 
          className="relative"
          style={{
            width: svgBounds.width,
            height: svgBounds.height,
            minHeight: '400px'
          }}
        >
          {/* SVG for connection lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={svgBounds.width}
            height={svgBounds.height}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
                fill="#E0E0E0"
              >
                <polygon points="0 0, 10 3.5, 0 7" />
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