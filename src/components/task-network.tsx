import React from 'react';
import { TaskCard, TaskCardProps } from './task-card';
import { ConnectionLine } from './connection-line';

interface TaskConnection {
  from: string;
  to: string;
}

const mockTasks: TaskCardProps[] = [
  // Root task
  {
    id: '1',
    title: 'Setup Next.js Project Boilerplate',
    author: 'Alex Chen',
    updateDate: '2024-01-15',
    updateTime: '10:00',
    position: { x: 100, y: 50 }
  },
  // Branched from task 1
  {
    id: '2',
    title: 'Configure Tailwind CSS & shadcn/ui',
    author: 'Sarah Kim',
    updateDate: '2024-01-15',
    updateTime: '14:30',
    position: { x: 350, y: 180 }
  },
  // Branched from task 1
  {
    id: '3',
    title: 'Setup Project Structure & Folders',
    author: 'Mike Rodriguez',
    updateDate: '2024-01-15',
    updateTime: '16:45',
    position: { x: 100, y: 310 }
  },
  // Branched from task 2
  {
    id: '4',
    title: 'Create Component Library',
    author: 'Emma Thompson',
    updateDate: '2024-01-16',
    updateTime: '09:20',
    position: { x: 600, y: 180 }
  },
  // Branched from task 2
  {
    id: '5',
    title: 'Add Dark Mode Support',
    author: 'David Park',
    updateDate: '2024-01-16',
    updateTime: '11:15',
    position: { x: 350, y: 440 }
  },
  // Branched from task 3
  {
    id: '6',
    title: 'Implement Authentication System',
    author: 'Lisa Wong',
    updateDate: '2024-01-16',
    updateTime: '13:40',
    position: { x: 100, y: 570 }
  },
  // Branched from task 4
  {
    id: '7',
    title: 'Design User Dashboard Layout',
    author: 'James Wilson',
    updateDate: '2024-01-16',
    updateTime: '15:25',
    position: { x: 850, y: 180 }
  },
  // Branched from task 4
  {
    id: '8',
    title: 'Implement Task Card Component',
    author: 'Anna Garcia',
    updateDate: '2024-01-17',
    updateTime: '08:50',
    position: { x: 600, y: 440 }
  },
  // Branched from task 5
  {
    id: '9',
    title: 'Add Theme Toggle Component',
    author: 'Tom Anderson',
    updateDate: '2024-01-17',
    updateTime: '10:30',
    position: { x: 350, y: 700 }
  },
  // Branched from task 8
  {
    id: '10',
    title: 'Add Connection Visualization',
    author: 'Sophie Miller',
    updateDate: '2024-01-17',
    updateTime: '12:15',
    position: { x: 600, y: 700 }
  },
  // Branched from task 7
  {
    id: '11',
    title: 'Add Responsive Design Breakpoints',
    author: 'Chris Taylor',
    updateDate: '2024-01-17',
    updateTime: '14:00',
    position: { x: 850, y: 440 }
  },
  // Branched from task 10
  {
    id: '12',
    title: 'Optimize Performance & Bundle Size',
    author: 'Maya Patel',
    updateDate: '2024-01-18',
    updateTime: '09:45',
    position: { x: 600, y: 960 }
  }
];

const connections: TaskConnection[] = [
  // Each task has only one parent (except root task 1)
  { from: '1', to: '2' },  // Setup -> Configure Tailwind
  { from: '1', to: '3' },  // Setup -> Project Structure
  { from: '2', to: '4' },  // Tailwind -> Component Library
  { from: '2', to: '5' },  // Tailwind -> Dark Mode
  { from: '3', to: '6' },  // Structure -> Authentication
  { from: '4', to: '7' },  // Components -> Dashboard Layout
  { from: '4', to: '8' },  // Components -> Task Card
  { from: '5', to: '9' },  // Dark Mode -> Theme Toggle
  { from: '8', to: '10' }, // Task Card -> Connections
  { from: '7', to: '11' }, // Dashboard -> Responsive
  { from: '10', to: '12' } // Connections -> Performance
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
        {/* Container for connection lines */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
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
        </div>
        
        {/* Render task cards */}
        <div className="relative" style={{ zIndex: 2 }}>
          {mockTasks.map(task => (
            <TaskCard
              key={task.id}
              {...task}
            />
          ))}
        </div>
      </div>
    </div>
  );
};