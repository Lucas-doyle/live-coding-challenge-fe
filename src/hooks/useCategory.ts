import { useCallback, useEffect, useState } from 'react'
import { getCategory, updateCategoryActive } from '../api/categories.ts'
import type { Category } from '../types.ts'

export function useCategory(id: number | null) {
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const load = useCallback(async () => {
    if (id === null) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    setNotFound(false)

    try {
      const data = await getCategory(id)
      setCategory(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load category'
      if (message.toLowerCase().includes('not found')) {
        setNotFound(true)
        setCategory(null)
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  const toggleActive = useCallback(async (isActive: boolean) => {
    if (!category) return

    const previous = category
    setCategory({ ...category, isActive })
    setError(null)

    try {
      const updated = await updateCategoryActive(category.id, isActive)
      setCategory(updated)
    } catch (err) {
      setCategory(previous)
      setError(err instanceof Error ? err.message : 'Failed to update category')
    }
  }, [category])

  return { category, loading, error, notFound, toggleActive, reload: load }
}
