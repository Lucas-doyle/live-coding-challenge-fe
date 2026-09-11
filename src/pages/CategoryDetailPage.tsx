import { Link, useParams } from 'react-router-dom'
import { ActiveToggle } from '../components/ActiveToggle.tsx'
import { ErrorBanner } from '../components/ErrorBanner.tsx'
import { useCategory } from '../hooks/useCategory.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export function CategoryDetailPage() {
  const { id } = useParams()
  const numericId = id && /^\d+$/.test(id) ? Number(id) : null
  const { category, loading, error, notFound, toggleActive, reload } =
    useCategory(numericId)

  if (notFound) {
    return <NotFoundPage />
  }

  return (
    <section className="detail-page">
      <Link to="/" className="back-link">
        ← Back to catalog
      </Link>

      {error ? <ErrorBanner message={error} onRetry={() => void reload()} /> : null}

      {loading || !category ? (
        <div className="detail-skeleton" />
      ) : (
        <article className="detail-card">
          <div className="detail-top">
            <p className="eyebrow">{category.pageType} · #{category.id}</p>
            <span className={`status-chip${category.isActive ? ' is-live' : ''}`}>
              {category.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <h1>{category.pageTitle}</h1>
          <p className="detail-content">{category.content}</p>
          <div className="detail-actions">
            <div>
              <p className="toggle-label">Availability</p>
              <p className="toggle-hint">
                Sends <code>PATCH /api/categories/{category.id}</code> with
                {' '}
                <code>{`{ "isActive": ${!category.isActive} }`}</code>
              </p>
            </div>
            <ActiveToggle
              checked={category.isActive}
              onChange={(next) => void toggleActive(next)}
            />
          </div>
        </article>
      )}
    </section>
  )
}
