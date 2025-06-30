import React from 'react';
import { TaskCard } from './task-card';
import { ConnectionLine } from './connection-line';
import { Task, TaskConnection } from '@/types/task';

interface TaskNetworkProps {
  tasks: Task[];
}

export const TaskNetwork: React.FC<TaskNetworkProps> = ({ tasks }) => {
  const CARD_WIDTH = 288; // 72 * 4 (w-72)
  const CARD_HEIGHT = 64; // 16 * 4 (h-16)
  const HORIZONTAL_SPACING = 320; // Card width + gap
  const VERTICAL_SPACING = 100;

  // Calculate positions for each task based on row and column
  const getTaskPosition = (task: Task) => {
    return {
      x: task.position.column * HORIZONTAL_SPACING + 50,
      y: task.position.row * VERTICAL_SPACING + 50,
    };
  };

  // Filter out duplicate tasks (tasks with same position that represent convergence points)
  const getUniqueTasksWithMergeInfo = () => {
    const taskGroups = new Map<string, Task[]>();
    
    // Group tasks by position
    tasks.forEach(task => {
      const posKey = `${task.position.row}-${task.position.column}`;
      if (!taskGroups.has(posKey)) {
        taskGroups.set(posKey, []);
      }
      taskGroups.get(posKey)!.push(task);
    });
    
    // Return unique tasks (first task from each position group)
    return Array.from(taskGroups.values()).map(group => group[0]);
  };

  // Generate connections between parent and child tasks
  const generateConnections = (): TaskConnection[] => {
    const connections: TaskConnection[] = [];
    const uniqueTasks = getUniqueTasksWithMergeInfo();
    
    tasks.forEach(task => {
      if (task.parentId) {
        const parent = tasks.find(t => t.id === task.parentId);
        if (parent) {
          const parentPos = getTaskPosition(parent);
          
          // Find the unique task at the child's position
          const childAtPosition = uniqueTasks.find(t => 
            t.position.row === task.position.row && 
            t.position.column === task.position.column
          );
          
          if (childAtPosition) {
            const childPos = getTaskPosition(childAtPosition);
            
            // Connection points (bottom center of parent to top center of child)
            const fromPosition = {
              x: parentPos.x + CARD_WIDTH / 2,
              y: parentPos.y + CARD_HEIGHT,
            };
            const toPosition = {
              x: childPos.x + CARD_WIDTH / 2,
              y: childPos.y,
            };
            
            // Avoid duplicate connections to the same position
            const existingConnection = connections.find(conn => 
              conn.toPosition.x === toPosition.x && 
              conn.toPosition.y === toPosition.y &&
              conn.fromPosition.x === fromPosition.x &&
              conn.fromPosition.y === fromPosition.y
            );
            
            if (!existingConnection) {
              connections.push({
                fromId: parent.id,
                toId: childAtPosition.id,
                fromPosition,
                toPosition,
              });
            }
          }
        }
      }
    });
    
    return connections;
  };

  const connections = generateConnections();
  const uniqueTasks = getUniqueTasksWithMergeInfo();
  
  // Calculate SVG dimensions
  const maxX = Math.max(...uniqueTasks.map(task => getTaskPosition(task).x)) + CARD_WIDTH + 50;
  const maxY = Math.max(...uniqueTasks.map(task => getTaskPosition(task).y)) + CARD_HEIGHT + 50;

  return (
    <div className="relative w-full overflow-auto bg-gray-50 min-h-screen p-4">
      {/* SVG for connection lines */}
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width={maxX}
        height={maxY}
        style={{ zIndex: 1 }}
      >
        {connections.map((connection, index) => (
          <ConnectionLine key={index} connection={connection} />
        ))}
      </svg>
      
      {/* Task cards */}
      <div className="relative" style={{ zIndex: 2 }}>
        {uniqueTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            position={getTaskPosition(task)}
          />
        ))}
      </div>
    </div>
  );
};