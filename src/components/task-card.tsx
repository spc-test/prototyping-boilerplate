import React from 'react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  position: { x: number; y: number };
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, position }) => {
  const getBackgroundColor = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'in-progress':
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div
      className={`absolute w-72 h-16 rounded-lg border shadow-sm p-3 ${getBackgroundColor()}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="flex items-start justify-between h-full">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
            {task.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {task.assignee}
          </p>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};