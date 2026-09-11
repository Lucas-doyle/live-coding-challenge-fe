import { useMemo, useState } from 'react'
import { ActiveFilter } from '../components/ActiveFilter.tsx'
import { CategoryCard } from '../components/CategoryCard.tsx'
import { ErrorBanner } from '../components/ErrorBanner.tsx'
import { SearchInput } from '../components/SearchInput.tsx'
import { useCategories } from '../hooks/useCategories.ts'

export function CategoryListPage() {
  const { categories, loading, error, toggleActive, reload } = useCategories()
  const [query, setQuery] = useState('')
  const [activeOnly, setActiveOnly] = useState(false)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return categories.filter((item) => {
      const matchesTitle = item.pageTitle.toLowerCase().includes(needle)
      const matchesActive = !activeOnly || item.isActive
      return matchesTitle && matchesActive
    })
  }, [activeOnly, categories, query])

  return (
    <section className="list-page">
      <div className="page-intro">
        <p className="eyebrow">Inventory</p>
        <h1>Categories</h1>
        <p className="lede">
          Browse the catalog, search by title, hide inactive stock, or flip a
          record live. Open any card for the full entry.
        </p>
      </div>

      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} />
        <ActiveFilter checked={activeOnly} onChange={setActiveOnly} />
      </div>

      <div className="result-meta">
        {loading
          ? 'Loading catalog…'
          : `Showing ${visible.length} of ${categories.length}`}
      </div>

      {error ? <ErrorBanner message={error} onRetry={() => void reload()} /> : null}

      {loading ? (
        <div className="card-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="skeleton-card" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="empty-state">
          <h2>Nothing matches</h2>
          <p>Try a broader title search or show inactive items again.</p>
        </div>
      ) : (
        <div className="card-grid">
          {visible.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onToggleActive={(id, isActive) => void toggleActive(id, isActive)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
