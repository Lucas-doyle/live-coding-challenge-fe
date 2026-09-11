import type { Category } from '../types.ts'

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const body = (await response.json()) as { message?: string }
      if (body.message) message = body.message
    } catch {
      // Keep the status-based message when the body is not JSON.
    }
    throw new Error(message)
  }

  return (await response.json()) as T
}

export function getCategories() {
  return request<Category[]>('/api/categories')
}

export function getCategory(id: number) {
  return request<Category>(`/api/categories/${id}`)
}

/**
 * Persist a status change with a partial update:
 *
 *   PATCH /api/categories/:id
 *   { "isActive": true }
 *
 * PATCH is the right verb because only one field changed. A production
 * backend would validate the payload, update the row, and return the
 * full resource so the UI can stay in sync without another GET.
 */
export function updateCategoryActive(id: number, isActive: boolean) {
  return request<Category>(`/api/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  })
}
