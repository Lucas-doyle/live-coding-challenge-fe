import { Link } from 'react-router-dom'
import type { Category } from '../types.ts'
import { ActiveToggle } from './ActiveToggle.tsx'

type CategoryCardProps = {
  category: Category
  onToggleActive: (id: number, isActive: boolean) => void
}

export function CategoryCard({ category, onToggleActive }: CategoryCardProps) {
  return (
    <article className="category-card">
      <Link to={`/categories/${category.id}`} className="category-card-link">
        <div className="card-meta">
          <span className="page-type">{category.pageType}</span>
          <span className={`status-chip${category.isActive ? ' is-live' : ''}`}>
            {category.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <h2>{category.pageTitle}</h2>
        <p>{category.content}</p>
      </Link>
      <div className="card-actions">
        <span>#{category.id}</span>
        <ActiveToggle
          checked={category.isActive}
          onChange={(next) => onToggleActive(category.id, next)}
        />
      </div>
    </article>
  )
}
