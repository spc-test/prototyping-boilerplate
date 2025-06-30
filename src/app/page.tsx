import { TaskNetwork } from '@/components/task-network';
import { Task } from '@/types/task';

const mockTasks: Task[] = [
  {
    id: '0',
    title: 'Initial Project Planning',
    assignee: 'Alex Chen',
    status: 'completed',
    type: 'default',
    position: { row: 0, column: 1 },
  },
  {
    id: '1',
    title: 'Prototype Evaluation: Share Observations & Feedback',
    assignee: 'Sarah Chen',
    status: 'completed',
    type: 'review',
    parentId: '0',
    position: { row: 1, column: 1 },
  },
  {
    id: '2',
    title: 'Review Initial Prototype Design',
    assignee: 'Mike Johnson',
    status: 'completed',
    type: 'review',
    parentId: '1',
    position: { row: 2, column: 0 },
  },
  {
    id: '3',
    title: 'Analyze User Experience Flow',
    assignee: 'Emma Davis',
    status: 'completed',
    type: 'review',
    parentId: '1',
    position: { row: 2, column: 2 },
  },
  {
    id: '4',
    title: 'Implement Core Navigation',
    assignee: 'Alex Rodriguez',
    status: 'in-progress',
    type: 'implementation',
    parentId: '2',
    position: { row: 3, column: 0 },
  },
  {
    id: '5',
    title: 'Create Interactive Components',
    assignee: 'Lisa Wang',
    status: 'pending',
    type: 'implementation',
    parentId: '3',
    position: { row: 3, column: 2 },
  },
  {
    id: '6',
    title: 'Optimize Performance Metrics',
    assignee: 'David Kim',
    status: 'in-progress',
    type: 'implementation',
    parentId: '4',
    position: { row: 4, column: 0 },
  },
  {
    id: '7',
    title: 'Validate User Interactions',
    assignee: 'Rachel Green',
    status: 'pending',
    type: 'testing',
    parentId: '5',
    position: { row: 4, column: 2 },
  },
  {
    id: '8',
    title: 'Code Review & Quality Check',
    assignee: 'Tom Wilson',
    status: 'pending',
    type: 'review',
    parentId: '6',
    position: { row: 5, column: 0 },
  },
  {
    id: '9',
    title: 'User Acceptance Testing',
    assignee: 'Jennifer Adams',
    status: 'pending',
    type: 'testing',
    parentId: '7',
    position: { row: 5, column: 2 },
  },
  {
    id: '10',
    title: 'Merge Feature Branches',
    assignee: 'Sophie Martinez',
    status: 'pending',
    type: 'implementation',
    parentId: '8',
    position: { row: 6, column: 1 },
  },
  {
    id: '11',
    title: 'Final Integration Testing',
    assignee: 'James Brown',
    status: 'pending',
    type: 'testing',
    parentId: '10',
    position: { row: 7, column: 1 },
  },
  {
    id: '12',
    title: 'Final Integration Testing',
    assignee: 'James Brown',
    status: 'pending',
    type: 'testing',
    parentId: '9',
    position: { row: 7, column: 1 },
  },
  {
    id: '13',
    title: 'Deploy to Staging Environment',
    assignee: 'Carlos Rivera',
    status: 'pending',
    type: 'implementation',
    parentId: '11',
    position: { row: 8, column: 1 },
  },
  {
    id: '14',
    title: 'Production Release',
    assignee: 'Anna Lee',
    status: 'pending',
    type: 'implementation',
    parentId: '13',
    position: { row: 9, column: 1 },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Flow Network
          </h1>
          <p className="text-gray-600">
            Interactive prototype showing branched task connections and workflow visualization
          </p>
        </div>
        <TaskNetwork tasks={mockTasks} />
      </div>
    </div>
  )
}
