import React from 'react';
import { cn } from '@/lib/utils';

export interface TaskCardProps {
  id: string;
  title: string;
  author: string;
  updateDate: string;
  updateTime: string;
  position: { x: number; y: number };
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  author,
  updateDate,
  updateTime,
  position,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute bg-card border border-border rounded-xl p-4 w-64 h-28 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <h3 className="text-[15px] font-medium text-foreground leading-tight mb-3 overflow-hidden line-clamp-2">
        {title}
      </h3>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs">
        <span className="text-muted-foreground">{author}</span>
        <span className="text-muted-foreground">
          {updateDate}, {updateTime}
        </span>
      </div>
    </div>
  );
};