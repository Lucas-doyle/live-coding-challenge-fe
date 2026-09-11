import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header.tsx'
import { CategoryDetailPage } from './pages/CategoryDetailPage.tsx'
import { CategoryListPage } from './pages/CategoryListPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<CategoryListPage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
