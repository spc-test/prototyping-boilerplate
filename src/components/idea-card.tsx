interface IdeaCardProps {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  status: 'default' | 'active' | 'completed';
  x: number;
  y: number;
}

export function IdeaCard({ title, author, createdAt, status, x, y }: IdeaCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-50 border-green-200';
      case 'completed':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'completed':
        return 'text-blue-600';
      default:
        return 'text-purple-600';
    }
  };

  return (
    <div
      className={`absolute w-60 p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 ${getStatusColor()}`}
      style={{ left: x, top: y }}
    >
      <div className="flex items-start gap-2 mb-3">
        <div className={`flex-shrink-0 w-3 h-3 mt-1 ${getIconColor()}`}>
          <svg viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0 L9 3 L6 6 L3 3 Z" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900 leading-tight">
          {title}
        </h3>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">{author}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}