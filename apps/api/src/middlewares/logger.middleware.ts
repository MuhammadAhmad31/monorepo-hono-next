import type { Context, Next } from 'hono'

interface LogColors {
  reset: string
  method: string
  status: (status: number) => string
  time: string
  path: string
}

const colors: LogColors = {
  reset: '\x1b[0m',
  method: '\x1b[36m', // cyan
  status: (status: number) => {
    if (status >= 500) return '\x1b[31m' // red
    if (status >= 400) return '\x1b[33m' // yellow
    if (status >= 300) return '\x1b[36m' // cyan
    if (status >= 200) return '\x1b[32m' // green
    return '\x1b[37m' // white
  },
  time: '\x1b[35m', // magenta
  path: '\x1b[90m', // gray
}

export const logger = async (c: Context, next: Next) => {
  const start = Date.now()
  const method = c.req.method
  const path = c.req.path

  await next()

  const status = c.res.status
  const elapsed = Date.now() - start

  const statusColor = colors.status(status)
  
  console.log(
    `${colors.method}${method}${colors.reset} ` +
    `${colors.path}${path}${colors.reset} ` +
    `${statusColor}${status}${colors.reset} ` +
    `${colors.time}${elapsed}ms${colors.reset}`
  )
}

export const detailedLogger = async (c: Context, next: Next) => {
  const start = Date.now()
  const method = c.req.method
  const path = c.req.path
  const userAgent = c.req.header('user-agent') || 'Unknown'
  
  console.log('\n' + '='.repeat(60))
  console.log(`📥 Incoming Request`)
  console.log(`Method: ${method}`)
  console.log(`Path: ${path}`)
  console.log(`User-Agent: ${userAgent}`)
  
  // Log request body for POST/PUT/PATCH
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      const body = await c.req.json()
      console.log('Body:', JSON.stringify(body, null, 2))
    } catch (e) {
      // Ignore if body is not JSON
    }
  }

  await next()

  const status = c.res.status
  const elapsed = Date.now() - start
  
  console.log(`\n📤 Response`)
  console.log(`Status: ${status}`)
  console.log(`Time: ${elapsed}ms`)
  console.log('='.repeat(60) + '\n')
}