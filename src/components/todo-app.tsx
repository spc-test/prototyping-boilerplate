"use client"

import { useState, useMemo } from "react"
import { Todo, FilterType } from "@/types/todo"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TodoItem } from "@/components/todo-item"
import { TodoFilters } from "@/components/todo-filters"
import { ModeToggle } from "@/components/mode-toggle"
import { Icons } from "@/components/icons"

// Fallback UUID generation for older browsers
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [filter, setFilter] = useLocalStorage<FilterType>("todoFilter", "all")
  const [newTodoText, setNewTodoText] = useState("")

  const addTodo = () => {
    if (newTodoText.trim() === "") return

    try {
      const now = new Date()
      const newTodo: Todo = {
        id: generateId(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now,
      }

      setTodos(prev => [newTodo, ...prev])
      setNewTodoText("")
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = (id: string) => {
    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        )
      )
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const updateTodo = (id: string, text: string) => {
    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id
            ? { ...todo, text, updatedAt: new Date() }
            : todo
        )
      )
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter(todo => !todo.completed)
      case "completed":
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const activeTodoCount = todos.filter(todo => !todo.completed).length
  const completedTodoCount = todos.filter(todo => todo.completed).length

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  // Get current time for dynamic messaging
  const currentHour = new Date().getHours()
  const getTimeBasedGreeting = () => {
    if (currentHour < 12) return "Good morning! Start your day with purpose 🌅"
    if (currentHour < 17) return "Good afternoon! Keep up the momentum ⚡"
    return "Good evening! Finish strong and plan for tomorrow 🌙"
  }

  const getProgressMessage = () => {
    if (todos.length === 0) return ""
    const completionRate = Math.round((completedTodoCount / todos.length) * 100)
    if (completionRate === 100) return `🎉 Perfect! You've completed all ${todos.length} tasks!`
    if (completionRate >= 75) return `🔥 Amazing progress! ${completionRate}% complete`
    if (completionRate >= 50) return `💪 Great work! You're ${completionRate}% done`
    if (completionRate >= 25) return `🚀 Nice start! ${completionRate}% completed`
    return `📝 Just getting started with ${todos.length} tasks`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Main Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
            My Todo App
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Stay organized, boost productivity, and get things done efficiently
          </p>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Quick tip:</strong> Press Enter to add tasks quickly, click on any task to edit it, and use filters to stay focused!
            </p>
          </div>
          
          {/* Dynamic motivational banner */}
          <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg border border-primary/20 max-w-xl mx-auto">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-primary">
                {getTimeBasedGreeting()}
              </p>
              {todos.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {getProgressMessage()}
                </p>
              )}
              <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
                <span>⌨️ Enter = Add</span>
                <span>✏️ Click = Edit</span>
                <span>🗑️ Delete = Remove</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="relative">
            <div className="absolute top-6 right-6">
              <ModeToggle />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-semibold text-foreground">
                Tasks Dashboard
              </CardTitle>
              <CardDescription>
                Manage your daily tasks and track your progress
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Add new todo */}
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done? (Press Enter to add quickly)"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={addTodo} disabled={newTodoText.trim() === ""}>
                <Icons.plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Filters and stats */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <TodoFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                activeTodoCount={activeTodoCount}
                completedTodoCount={completedTodoCount}
              />
              
              {completedTodoCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Completed
                </Button>
              )}
            </div>

            {/* Todo list */}
            <div className="space-y-2">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {filter === "all" && todos.length === 0 && (
                    <div>
                      <Icons.check className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No todos yet. Add one above to get started!</p>
                      <p className="text-sm">Start by adding your first task and take control of your day! 🚀</p>
                    </div>
                  )}
                  {filter === "active" && activeTodoCount === 0 && todos.length > 0 && (
                    <div>
                      <Icons.check className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No active todos. Great job! 🎉</p>
                      <p className="text-sm">You've completed all your tasks. Time to celebrate or add more goals!</p>
                    </div>
                  )}
                  {filter === "completed" && completedTodoCount === 0 && (
                    <div>
                      <Icons.check className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No completed todos yet.</p>
                    </div>
                  )}
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                  />
                ))
              )}
            </div>

            {/* Footer stats */}
            {todos.length > 0 && (
              <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                <p>{activeTodoCount} active, {completedTodoCount} completed</p>
                {completedTodoCount > 0 && (
                  <p className="mt-1 text-xs">
                    🎯 Keep going! You're making great progress on your goals.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}