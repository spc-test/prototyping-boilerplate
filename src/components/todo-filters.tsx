"use client"

import { FilterType } from "@/types/todo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TodoFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  activeTodoCount: number
  completedTodoCount: number
}

export function TodoFilters({ 
  currentFilter, 
  onFilterChange, 
  activeTodoCount, 
  completedTodoCount 
}: TodoFiltersProps) {
  const filters: { value: FilterType; label: string; count?: number }[] = [
    { value: 'all', label: 'All', count: activeTodoCount + completedTodoCount },
    { value: 'active', label: 'Active', count: activeTodoCount },
    { value: 'completed', label: 'Completed', count: completedTodoCount },
  ]

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "transition-all",
            currentFilter === filter.value && "shadow-sm"
          )}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className="ml-2 text-xs opacity-70">
              ({filter.count})
            </span>
          )}
        </Button>
      ))}
    </div>
  )
}