"use client"

import { useState } from "react"
import { Todo } from "@/types/todo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="flex-shrink-0"
      />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleSave}
            disabled={editText.trim() === ""}
          >
            <Icons.check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
          >
            <Icons.close className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "flex-1 text-sm cursor-pointer",
              todo.completed && "line-through text-muted-foreground"
            )}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
          >
            <Icons.edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(todo.id)}
            className="text-destructive hover:text-destructive"
          >
            <Icons.trash className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}