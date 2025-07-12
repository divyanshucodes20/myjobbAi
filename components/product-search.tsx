"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface ProductSearchProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  onClearFilters: () => void
  categories: string[]
  searchQuery: string
  selectedCategory: string
}

export default function ProductSearch({
  onSearch,
  onCategoryFilter,
  onClearFilters,
  categories,
  searchQuery,
  selectedCategory,
}: ProductSearchProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localQuery)
  }

  const hasActiveFilters = searchQuery || selectedCategory

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="flex gap-2">
        <Select value={selectedCategory} onValueChange={onCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
