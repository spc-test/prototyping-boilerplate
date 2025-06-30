import React from 'react';
import { TaskCard, TaskCardProps } from './task-card';
import { ConnectionLine } from './connection-line';

interface TaskConnection {
  from: string;
  to: string;
}

const rawTasks = [
  // Root task
  {
    id: '1',
    title: 'Setup Next.js Project Boilerplate',
    author: 'Alex Chen',
    updateDate: '2024-01-15',
    updateTime: '10:00'
  },
  // Branched from task 1
  {
    id: '2',
    title: 'Configure Tailwind CSS & shadcn/ui',
    author: 'Sarah Kim',
    updateDate: '2024-01-15',
    updateTime: '14:30'
  },
  // Branched from task 1
  {
    id: '3',
    title: 'Setup Project Structure & Folders',
    author: 'Mike Rodriguez',
    updateDate: '2024-01-15',
    updateTime: '16:45'
  },
  // Branched from task 2
  {
    id: '4',
    title: 'Create Component Library',
    author: 'Emma Thompson',
    updateDate: '2024-01-16',
    updateTime: '09:20'
  },
  // Branched from task 2
  {
    id: '5',
    title: 'Add Dark Mode Support',
    author: 'David Park',
    updateDate: '2024-01-16',
    updateTime: '11:15'
  },
  // Branched from task 3
  {
    id: '6',
    title: 'Implement Authentication System',
    author: 'Lisa Wong',
    updateDate: '2024-01-16',
    updateTime: '13:40'
  },
  // Branched from task 4
  {
    id: '7',
    title: 'Design User Dashboard Layout',
    author: 'James Wilson',
    updateDate: '2024-01-16',
    updateTime: '15:25'
  },
  // Branched from task 4
  {
    id: '8',
    title: 'Implement Task Card Component',
    author: 'Anna Garcia',
    updateDate: '2024-01-17',
    updateTime: '08:50'
  },
  // Branched from task 5
  {
    id: '9',
    title: 'Add Theme Toggle Component',
    author: 'Tom Anderson',
    updateDate: '2024-01-17',
    updateTime: '10:30'
  },
  // Branched from task 8
  {
    id: '10',
    title: 'Add Connection Visualization',
    author: 'Sophie Miller',
    updateDate: '2024-01-17',
    updateTime: '12:15'
  },
  // Branched from task 7
  {
    id: '11',
    title: 'Add Responsive Design Breakpoints',
    author: 'Chris Taylor',
    updateDate: '2024-01-17',
    updateTime: '14:00'
  },
  // Branched from task 10
  {
    id: '12',
    title: 'Optimize Performance & Bundle Size',
    author: 'Maya Patel',
    updateDate: '2024-01-18',
    updateTime: '09:45'
  }
];

// Sort tasks by date and time (latest first)
const sortedTasks = [...rawTasks].sort((a, b) => {
  const dateA = new Date(`${a.updateDate} ${a.updateTime}`);
  const dateB = new Date(`${b.updateDate} ${b.updateTime}`);
  return dateB.getTime() - dateA.getTime();
});

// Assign vertical positions based on sorted order
const mockTasks: TaskCardProps[] = sortedTasks.map((task, index) => ({
  ...task,
  position: { x: 400, y: 50 + index * 150 }
}));

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
    <div className="relative w-full min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Task Branching Network</h1>
        <p className="text-muted-foreground">Visualizing task dependencies and branching relationships (Latest to Oldest)</p>
      </div>
      
      <div className="relative" style={{ width: '1200px', height: `${50 + mockTasks.length * 150 + 100}px` }}>
        {/* Render task cards first */}
        {mockTasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
          />
        ))}
        
        {/* Render connection lines on top */}
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
    </div>
  );
};