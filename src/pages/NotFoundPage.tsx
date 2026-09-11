import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="empty-state not-found">
      <p className="eyebrow">404</p>
      <h1>That entry is missing</h1>
      <p>The category id is not in the catalog, or the route does not exist.</p>
      <Link to="/" className="text-button">
        Return to the list
      </Link>
    </section>
  )
}
