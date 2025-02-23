'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Todo {
  id: string
  title: string
  completed: boolean
  username: string
  created_at: string
  list_id: string
}

// Make listId optional since we might want to show all todos
interface TodoTableProps {
  listId?: string
}

export default function TodoTable({ listId }: TodoTableProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Move fetchTodos into useCallback to avoid dependency issues
  const fetchTodos = useCallback(async () => {
    if (!listId) return
    
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/lists/${listId}/todos`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      console.log('Fetched todos:', data) // Debug log
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }, [listId]) // Add listId as dependency

  // Now fetchTodos is stable and can be used in useEffect
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos]) // Add fetchTodos as dependency

  const handleToggle = async (todoId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/todos/${todoId}/toggle`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to toggle todo')
      }
      
      // Update local state immediately for better UX
      setTodos(todos.map(todo => 
        todo.id === todoId 
          ? { ...todo, completed: !todo.completed }
          : todo
      ))
      
      // Then refresh from server to ensure sync
      fetchTodos()
    } catch (error) {
      console.error('Failed to toggle todo:', error)
      // Revert by refreshing from server if the update fails
      fetchTodos()
    }
  }

  const handleNewTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim() || !listId) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/lists/${listId}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTodoTitle,
          completed: false,
        }),
      })
      if (!response.ok) throw new Error('Failed to create todo')
      setNewTodoTitle('')
      fetchTodos()
    } catch (error) {
      console.error('Failed to create todo:', error)
    }
  }
  
  if (!listId) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* New Todo Form */}
      <form onSubmit={handleNewTodo} className="flex gap-2">
        <Input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add new todo..."
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      {/* Todo Table */}
      {loading ? (
        <div>Loading...</div>
      ) : todos.length === 0 ? (
        <div>No todos in this list yet</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Done</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggle(todo.id)}
                  />
                </TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{new Date(todo.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{todo.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
} 