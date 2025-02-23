'use client'

import { useState } from 'react'
import TodoTable from '../components/todos/TodoTable'
import ListSelector from '../components/todos/ListSelector'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TodosPage() {
  const [selectedListId, setSelectedListId] = useState<string>('')
  const [newListTitle, setNewListTitle] = useState('')

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newListTitle.trim()) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/lists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newListTitle,
          description: "",
          is_public: false
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Failed to create list:', errorData)
        throw new Error(errorData.detail || 'Failed to create list')
      }

      setNewListTitle('')
      // Refresh the page to show the new list
      window.location.reload()
    } catch (error) {
      console.error('Failed to create list:', error)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <form onSubmit={handleCreateList} className="flex gap-2">
          <Input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="New list name..."
          />
          <Button type="submit">Create List</Button>
        </form>
      </div>

      <div className="mb-6">
        <ListSelector onListSelect={setSelectedListId} />
      </div>

      {selectedListId ? (
        <TodoTable listId={selectedListId} />
      ) : (
        <p className="text-muted-foreground">Select a list to view todos</p>
      )}
    </main>
  )
} 