import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRoutes } from './routes/users'
import { postRoutes } from './routes/posts'
import { detailedLogger } from './middlewares/logger.middleware'
import { logger } from 'hono/logger'
import { errorHandler } from './middlewares/error-handler.middleware'


const app = new Hono()

app.use('*', cors({
  origin: ['http://localhost:3002'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
}))

if (process.env.NODE_ENV === 'development') {
  app.use('*', detailedLogger)
} else {
  app.use('*', logger())
}

app.get('/', (c) => {
  return c.json({ 
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/health',
      api: {
        users: '/api/users',
        posts: '/api/posts'
      }
    }
  })
})

app.get('/health', (c) => {
  return c.json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'connected'
  })
})

const routes = app
  .basePath('/api')
  .route('/users', userRoutes)
  .route('/posts', postRoutes)

app.notFound((c) => {
  return c.json(
    { 
      success: false, 
      error: 'Route not found',
      statusCode: 404,
      path: c.req.path,
      method: c.req.method,
      availableEndpoints: [
        'GET /',
        'GET /health',
        'GET /api/users',
        'POST /api/users',
        'GET /api/posts',
        'POST /api/posts'
      ]
    }, 
    404
  )
})

app.onError((err, c) => {
  return errorHandler(err, c)
})

const port = parseInt(process.env.PORT || '3001')

console.log('='.repeat(60))
console.log('🚀 Server is starting...')
console.log('='.repeat(60))
console.log(`📍 URL: http://localhost:${port}`)
console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`🌐 CORS: http://localhost:3002`)
console.log(`📊 Health Check: http://localhost:${port}/health`)
console.log(`🔗 API Base: http://localhost:${port}/api`)
console.log('='.repeat(60))

Bun.serve({
  port,
  fetch: routes.fetch,
})

export type AppType = typeof routes

export default routes