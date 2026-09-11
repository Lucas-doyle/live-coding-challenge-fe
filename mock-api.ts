import fs from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import type { Connect, Plugin } from 'vite'

export type CategoryRecord = {
  id: number
  pageType: string
  pageTitle: string
  isActive: boolean
  content: string
}

function loadSeed(): CategoryRecord[] {
  const file = path.resolve(process.cwd(), 'data.json')
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as CategoryRecord[]
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function mockCategoriesApi(): Plugin {
  let store: CategoryRecord[] = []

  const handler: Connect.NextHandleFunction = (req, res, next) => {
    void handleRequest(req, res, next)
  }

  async function handleRequest(
    req: IncomingMessage,
    res: ServerResponse,
    next: Connect.NextFunction,
  ) {
    const url = req.url ?? ''
    if (!url.startsWith('/api/categories')) {
      next()
      return
    }

    const { pathname } = new URL(url, 'http://localhost')
    const idMatch = pathname.match(/^\/api\/categories\/(\d+)$/)
    const isCollection = pathname === '/api/categories'
    const id = idMatch ? Number(idMatch[1]) : null
    const method = req.method ?? 'GET'

    try {
      await delay(220)

      if (method === 'GET' && isCollection) {
        sendJson(res, 200, store)
        return
      }

      if (method === 'GET' && id !== null) {
        const item = store.find((category) => category.id === id)
        if (!item) {
          sendJson(res, 404, { message: `Category ${id} not found` })
          return
        }
        sendJson(res, 200, item)
        return
      }

      if ((method === 'PATCH' || method === 'PUT') && id !== null) {
        const raw = await readBody(req)
        const patch = raw ? (JSON.parse(raw) as Partial<CategoryRecord>) : {}
        const index = store.findIndex((category) => category.id === id)

        if (index === -1) {
          sendJson(res, 404, { message: `Category ${id} not found` })
          return
        }

        const current = store[index]
        store[index] = {
          ...current,
          ...patch,
          id: current.id,
        }
        sendJson(res, 200, store[index])
        return
      }

      sendJson(res, 405, { message: 'Method not allowed' })
    } catch {
      sendJson(res, 500, { message: 'Internal server error' })
    }
  }

  return {
    name: 'mock-categories-api',
    configureServer(server) {
      store = loadSeed()
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      store = loadSeed()
      server.middlewares.use(handler)
    },
  }
}
