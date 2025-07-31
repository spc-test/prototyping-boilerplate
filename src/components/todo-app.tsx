"use client"

import { useState, useMemo } from "react"
import { Todo, FilterType } from "@/types/todo"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TodoItem } from "@/components/todo-item"
import { TodoFilters } from "@/components/todo-filters"
import { Icons } from "@/components/icons"

export function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [filter, setFilter] = useLocalStorage<FilterType>("todoFilter", "all")
  const [newTodoText, setNewTodoText] = useState("")

  const addTodo = () => {
    if (newTodoText.trim() === "") return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setTodos(prev => [newTodo, ...prev])
    setNewTodoText("")
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const updateTodo = (id: string, text: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text, updatedAt: new Date() }
          : todo
      )
    )
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Todo App
            </CardTitle>
            <CardDescription>
              Stay organized and get things done
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Add new todo */}
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
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
                      <p>No todos yet. Add one above to get started!</p>
                    </div>
                  )}
                  {filter === "active" && activeTodoCount === 0 && todos.length > 0 && (
                    <div>
                      <Icons.check className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No active todos. Great job!</p>
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
                {activeTodoCount} active, {completedTodoCount} completed
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}