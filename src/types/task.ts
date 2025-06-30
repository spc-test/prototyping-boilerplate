export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
  type: 'default' | 'review' | 'implementation' | 'testing';
  parentId?: string;
  position: {
    row: number;
    column: number;
  };
}

export interface TaskConnection {
  fromId: string;
  toId: string;
  fromPosition: { x: number; y: number };
  toPosition: { x: number; y: number };
}

export interface TaskNetworkData {
  tasks: Task[];
  connections: TaskConnection[];
}