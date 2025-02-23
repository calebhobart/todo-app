'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface List {
  id: string
  name: string
  username: string
}

interface ListSelectorProps {
  onListSelect: (listId: string) => void
}

export default function ListSelector({ onListSelect }: ListSelectorProps) {
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/lists', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if (!response.ok) throw new Error('Failed to fetch lists')
      const data = await response.json()
      console.log('Fetched lists:', data)
      setLists(data)
    } catch (error) {
      console.error('Failed to fetch lists:', error)
    }
  }

  return (
    <Select onValueChange={onListSelect}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a list" />
      </SelectTrigger>
      <SelectContent>
        {lists.map((list) => (
          <SelectItem key={list.id} value={list.id}>
            {list.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 