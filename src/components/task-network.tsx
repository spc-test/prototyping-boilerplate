import React from 'react';
import { TaskCard, TaskCardProps } from './task-card';
import { ConnectionLine } from './connection-line';

interface TaskConnection {
  from: string;
  to: string;
}

const mockTasks: TaskCardProps[] = [
  {
    id: '1',
    title: 'Setup Next.js Project Boilerplate',
    author: 'Alex Chen',
    updateDate: '2024-01-15',
    updateTime: '14:30',
    position: { x: 100, y: 50 }
  },
  {
    id: '2',
    title: 'Configure Tailwind CSS & shadcn/ui',
    author: 'Sarah Kim',
    updateDate: '2024-01-15',
    updateTime: '16:45',
    position: { x: 450, y: 50 }
  },
  {
    id: '3',
    title: 'Implement Authentication System',
    author: 'Mike Rodriguez',
    updateDate: '2024-01-16',
    updateTime: '09:20',
    position: { x: 800, y: 50 }
  },
  {
    id: '4',
    title: 'Design User Dashboard Layout',
    author: 'Emma Thompson',
    updateDate: '2024-01-16',
    updateTime: '11:15',
    position: { x: 100, y: 220 }
  },
  {
    id: '5',
    title: 'Create Component Library',
    author: 'David Park',
    updateDate: '2024-01-16',
    updateTime: '13:40',
    position: { x: 450, y: 220 }
  },
  {
    id: '6',
    title: 'Add Dark Mode Support',
    author: 'Lisa Wong',
    updateDate: '2024-01-16',
    updateTime: '15:25',
    position: { x: 800, y: 220 }
  },
  {
    id: '7',
    title: 'Implement Task Card Component',
    author: 'James Wilson',
    updateDate: '2024-01-17',
    updateTime: '08:50',
    position: { x: 275, y: 390 }
  },
  {
    id: '8',
    title: 'Add Connection Visualization',
    author: 'Anna Garcia',
    updateDate: '2024-01-17',
    updateTime: '10:30',
    position: { x: 625, y: 390 }
  },
  {
    id: '9',
    title: 'Optimize Performance & Bundle Size',
    author: 'Tom Anderson',
    updateDate: '2024-01-17',
    updateTime: '12:15',
    position: { x: 100, y: 560 }
  },
  {
    id: '10',
    title: 'Add Responsive Design Breakpoints',
    author: 'Sophie Miller',
    updateDate: '2024-01-17',
    updateTime: '14:00',
    position: { x: 450, y: 560 }
  },
  {
    id: '11',
    title: 'Implement Drag & Drop Functionality',
    author: 'Chris Taylor',
    updateDate: '2024-01-17',
    updateTime: '16:20',
    position: { x: 800, y: 560 }
  },
  {
    id: '12',
    title: 'Add Unit Tests & E2E Testing',
    author: 'Maya Patel',
    updateDate: '2024-01-18',
    updateTime: '09:45',
    position: { x: 450, y: 730 }
  }
];

const connections: TaskConnection[] = [
  { from: '1', to: '2' },
  { from: '1', to: '4' },
  { from: '2', to: '3' },
  { from: '2', to: '5' },
  { from: '3', to: '6' },
  { from: '4', to: '7' },
  { from: '5', to: '7' },
  { from: '5', to: '8' },
  { from: '6', to: '8' },
  { from: '7', to: '9' },
  { from: '7', to: '10' },
  { from: '8', to: '11' },
  { from: '9', to: '12' },
  { from: '10', to: '12' },
  { from: '11', to: '12' }
];

export const TaskNetwork: React.FC = () => {
  const getTaskById = (id: string) => mockTasks.find(task => task.id === id);

  return (
    <div className="relative w-full h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Task Branching Network</h1>
        <p className="text-muted-foreground">Visualizing task dependencies and branching relationships</p>
      </div>
      
      <div className="relative" style={{ width: '1200px', height: '900px' }}>
        {/* Render connection lines first (behind cards) */}
        {connections.map(connection => {
          const fromTask = getTaskById(connection.from);
          const toTask = getTaskById(connection.to);
          
          if (!fromTask || !toTask) return null;
          
          return (
            <ConnectionLine
              key={`${connection.from}-${connection.to}`}
              from={fromTask.position}
              to={toTask.position}
            />
          );
        })}
        
        {/* Render task cards */}
        {mockTasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
          />
        ))}
      </div>
    </div>
  );
};