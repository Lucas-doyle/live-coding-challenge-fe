import { useCallback, useEffect, useState } from 'react'
import { getCategories, updateCategoryActive } from '../api/categories.ts'
import type { Category } from '../types.ts'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const toggleActive = useCallback(async (id: number, isActive: boolean) => {
    const previous = categories
    setCategories((current) =>
      current.map((item) => (item.id === id ? { ...item, isActive } : item)),
    )
    setError(null)

    try {
      const updated = await updateCategoryActive(id, isActive)
      setCategories((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      )
    } catch (err) {
      setCategories(previous)
      setError(err instanceof Error ? err.message : 'Failed to update category')
    }
  }, [categories])

  return { categories, loading, error, toggleActive, reload: load }
}
