"use client";

import { useState } from 'react';
import { IdeaNode, calculateDAGLayout } from './dag-layout';
import { IdeaCard } from './idea-card';
import { ConnectionLine } from './connection-line';

// Test data variations
const testDatasets = {
  simple: [
    {
      id: '1',
      title: 'Create user authentication system',
      author: 'Alice Johnson',
      createdAt: '2 days ago',
      status: 'completed' as const,
      parentIds: []
    },
    {
      id: '2',
      title: 'Add password reset functionality',
      author: 'Bob Smith',
      createdAt: '1 day ago',
      status: 'active' as const,
      parentIds: ['1']
    },
    {
      id: '3',
      title: 'Implement two-factor authentication',
      author: 'Carol Wilson',
      createdAt: '6 hours ago',
      status: 'default' as const,
      parentIds: ['2']
    }
  ],

  branching: [
    {
      id: '1',
      title: 'Design homepage layout',
      author: 'Design Team',
      createdAt: '3 days ago',
      status: 'completed' as const,
      parentIds: []
    },
    {
      id: '2',
      title: 'Implement hero section',
      author: 'Frontend Dev',
      createdAt: '2 days ago',
      status: 'completed' as const,
      parentIds: ['1']
    },
    {
      id: '3',
      title: 'Add navigation menu',
      author: 'UI Developer',
      createdAt: '2 days ago',
      status: 'active' as const,
      parentIds: ['1']
    },
    {
      id: '4',
      title: 'Create footer component',
      author: 'Frontend Dev',
      createdAt: '1 day ago',
      status: 'default' as const,
      parentIds: ['1']
    },
    {
      id: '5',
      title: 'Add responsive breakpoints',
      author: 'CSS Specialist',
      createdAt: '8 hours ago',
      status: 'default' as const,
      parentIds: ['2', '3']
    }
  ],

  complex: [
    {
      id: '1',
      title: 'Project initialization',
      author: 'Tech Lead',
      createdAt: '1 week ago',
      status: 'completed' as const,
      parentIds: []
    },
    {
      id: '2',
      title: 'Database schema design',
      author: 'Backend Dev',
      createdAt: '6 days ago',
      status: 'completed' as const,
      parentIds: ['1']
    },
    {
      id: '3',
      title: 'API endpoints setup',
      author: 'Backend Dev',
      createdAt: '5 days ago',
      status: 'completed' as const,
      parentIds: ['2']
    },
    {
      id: '4',
      title: 'User interface mockups',
      author: 'Designer',
      createdAt: '6 days ago',
      status: 'completed' as const,
      parentIds: ['1']
    },
    {
      id: '5',
      title: 'Component library setup',
      author: 'Frontend Dev',
      createdAt: '4 days ago',
      status: 'active' as const,
      parentIds: ['4']
    },
    {
      id: '6',
      title: 'User authentication API',
      author: 'Backend Dev',
      createdAt: '3 days ago',
      status: 'active' as const,
      parentIds: ['3']
    },
    {
      id: '7',
      title: 'Login page implementation',
      author: 'Frontend Dev',
      createdAt: '2 days ago',
      status: 'default' as const,
      parentIds: ['5', '6']
    },
    {
      id: '8',
      title: 'Profile management',
      author: 'Full Stack Dev',
      createdAt: '2 days ago',
      status: 'default' as const,
      parentIds: ['6']
    },
    {
      id: '9',
      title: 'Dashboard analytics',
      author: 'Data Engineer',
      createdAt: '1 day ago',
      status: 'default' as const,
      parentIds: ['3']
    },
    {
      id: '10',
      title: 'Mobile responsive design',
      author: 'UI Developer',
      createdAt: '1 day ago',
      status: 'default' as const,
      parentIds: ['7', '8']
    }
  ],

  singleRemix: [
    {
      id: '1',
      title: 'Build todo list application',
      author: 'Original Creator',
      createdAt: '3 days ago',
      status: 'completed' as const,
      parentIds: []
    },
    {
      id: '2',
      title: 'Add drag and drop functionality',
      author: 'Remix Author',
      createdAt: '1 day ago',
      status: 'active' as const,
      parentIds: ['1']
    }
  ],

  multipleRemixes: [
    {
      id: '1',
      title: 'Create weather widget',
      author: 'Weather Team',
      createdAt: '5 days ago',
      status: 'completed' as const,
      parentIds: []
    },
    {
      id: '2',
      title: 'Add 7-day forecast',
      author: 'Forecast Dev',
      createdAt: '3 days ago',
      status: 'completed' as const,
      parentIds: ['1']
    },
    {
      id: '3',
      title: 'Include hourly predictions',
      author: 'Data Analyst',
      createdAt: '3 days ago',
      status: 'active' as const,
      parentIds: ['1']
    },
    {
      id: '4',
      title: 'Add weather alerts',
      author: 'Alert System',
      createdAt: '2 days ago',
      status: 'default' as const,
      parentIds: ['1']
    },
    {
      id: '5',
      title: 'Integrate radar maps',
      author: 'Map Developer',
      createdAt: '1 day ago',
      status: 'default' as const,
      parentIds: ['2', '3']
    }
  ]
};

export function IdeaDAG() {
  const [selectedDataset, setSelectedDataset] = useState<keyof typeof testDatasets>('complex');
  
  const currentData = testDatasets[selectedDataset];
  const layout = calculateDAGLayout(currentData);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Idea DAG Visualization</h1>
        
        <div className="flex gap-2 mb-6">
          <label className="text-sm font-medium text-gray-700 mr-4">Test Data:</label>
          {Object.keys(testDatasets).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedDataset(key as keyof typeof testDatasets)}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                selectedDataset === key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 overflow-auto">
        <div 
          className="relative"
          style={{ 
            width: layout.width, 
            height: layout.height,
            minWidth: '800px',
            minHeight: '400px'
          }}
        >
          {/* Render connections */}
          <svg 
            className="absolute inset-0 pointer-events-none"
            width={layout.width}
            height={layout.height}
          >
            {layout.connections.map((connection, index) => (
              <ConnectionLine
                key={`${connection.fromId}-${connection.toId}-${index}`}
                fromX={connection.fromX}
                fromY={connection.fromY}
                toX={connection.toX}
                toY={connection.toY}
              />
            ))}
          </svg>

          {/* Render cards */}
          {layout.positionedNodes.map((node) => (
            <IdeaCard
              key={node.id}
              id={node.id}
              title={node.title}
              author={node.author}
              createdAt={node.createdAt}
              status={node.status}
              x={node.x}
              y={node.y}
            />
          ))}
        </div>
      </div>
    </div>
  );
}