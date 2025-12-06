import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { userRoutes } from './routes/users'
import { postRoutes } from './routes/posts'

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:3002'],
  credentials: true,
}))

app.get('/', (c) => {
  return c.json({ 
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString()
  })
})

const routes = app
  .basePath('/api')
  .route('/users', userRoutes)
  .route('/posts', postRoutes)

const port = parseInt(process.env.PORT || '3001')

console.log(`🚀 Server running on http://localhost:${port}`)

Bun.serve({
  port,
  fetch: routes.fetch,
})

export type AppType = typeof routes

export default routes