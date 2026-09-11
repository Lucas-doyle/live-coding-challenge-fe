import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mockCategoriesApi } from './mock-api.ts'

export default defineConfig({
  plugins: [react(), mockCategoriesApi()],
})
