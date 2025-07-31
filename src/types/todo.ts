export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type FilterType = 'all' | 'active' | 'completed'

export interface TodoState {
  todos: Todo[]
  filter: FilterType
}