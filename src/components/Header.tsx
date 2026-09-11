import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <span>
          <strong>Supply Catalog</strong>
          <em>category depot</em>
        </span>
      </Link>
      <p className="header-note">Mocked REST API · live status edits</p>
    </header>
  )
}
