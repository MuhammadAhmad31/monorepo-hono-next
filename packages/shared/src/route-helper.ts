import type { Hono } from 'hono'
import type { ValidRoute, ValidMethod } from './routes'
import { API_CONTRACT } from './routes'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * Wrapper untuk Hono route yang melakukan validasi contract
 */
export function createValidatedRoutes() {
  const registeredRoutes = new Map<string, Set<HTTPMethod>>()
  const violations: string[] = []
  
  function validateRoute(path: string, method: HTTPMethod) {
    const normalizedPath = path
      .replace(/\/+/g, '/')
      .replace(/\/$/, '')
      .replace(/^$/, '/') as ValidRoute
    
    if (!(normalizedPath in API_CONTRACT)) {
      const validPaths = Object.keys(API_CONTRACT).join(', ')
      const errorMsg = 
        `\n❌ CONTRACT VIOLATION\n` +
        `Route "${normalizedPath}" is not defined in API contract.\n` +
        `Valid routes: ${validPaths}\n` +
        `\n💡 Add this route to packages/shared/src/routes.ts first!\n`
      
      violations.push(errorMsg)
      console.error(errorMsg)
      return
    }
    
    const validMethods = API_CONTRACT[normalizedPath as ValidRoute]
    if (!validMethods.includes(method)) {
      const errorMsg = 
        `\n❌ CONTRACT VIOLATION\n` +
        `Method "${method}" is not allowed for route "${normalizedPath}".\n` +
        `Valid methods for ${normalizedPath}: ${validMethods.join(', ')}\n` +
        `\n💡 Update the contract in packages/shared/src/routes.ts if you need this method!\n`
      
      violations.push(errorMsg)
      console.error(errorMsg)
      return
    }
    
    const key = `${method} ${normalizedPath}`
    if (!registeredRoutes.has(key)) {
      registeredRoutes.set(key, new Set())
    }
    
    console.log(`✅ Route validated: ${method} ${normalizedPath}`)
  }
  
  return {
    /**
     * Wrap Hono instance dengan validasi contract
     * 
     * @param route - Hono instance to wrap
     * @param basePath - Base path prefix (e.g., '/users')
     */
    wrap<T extends Hono>(route: T, basePath: string = '') {
      const originalGet = route.get.bind(route)
      const originalPost = route.post.bind(route)
      const originalPut = route.put.bind(route)
      const originalDelete = route.delete.bind(route)
      const originalPatch = route.patch.bind(route)
      
      route.get = ((path: string, ...handlers: any[]) => {
        const fullPath = (basePath + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/'
        validateRoute(fullPath, 'GET')
        return originalGet(path, ...handlers)
      }) as any
      
      route.post = ((path: string, ...handlers: any[]) => {
        const fullPath = (basePath + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/'
        validateRoute(fullPath, 'POST')
        return originalPost(path, ...handlers)
      }) as any
      
      route.put = ((path: string, ...handlers: any[]) => {
        const fullPath = (basePath + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/'
        validateRoute(fullPath, 'PUT')
        return originalPut(path, ...handlers)
      }) as any
      
      route.delete = ((path: string, ...handlers: any[]) => {
        const fullPath = (basePath + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/'
        validateRoute(fullPath, 'DELETE')
        return originalDelete(path, ...handlers)
      }) as any
      
      route.patch = ((path: string, ...handlers: any[]) => {
        const fullPath = (basePath + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/'
        validateRoute(fullPath, 'PATCH')
        return originalPatch(path, ...handlers)
      }) as any
      
      return route
    },
    
    /**
     * Get list of all registered routes
     */
    getRegisteredRoutes() {
      return Array.from(registeredRoutes.keys()).sort()
    },
    
    /**
     * Check if there are any violations
     */
    hasViolations() {
      return violations.length > 0
    },
    
    /**
     * Get all violations
     */
    getViolations() {
      return violations
    },
    
    /**
     * Print summary of registered routes
     */
    printSummary() {
      console.log('\n📋 Registered API Routes:')
      const routes = this.getRegisteredRoutes()
      routes.forEach(route => {
        console.log(`   ${route}`)
      })
      console.log(`✅ Total: ${routes.length} routes registered\n`)
      
      if (violations.length > 0) {
        console.error('\n⚠️  WARNING: Contract violations detected!\n')
        violations.forEach(v => console.error(v))
      }
    }
  }
}

/**
 * Manual validation helper (alternative approach)
 */
export function validateApiContract(route: string, method: HTTPMethod): void {
  const normalizedPath = route
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') 
    .replace(/^$/, '/') as ValidRoute
  
  if (!(normalizedPath in API_CONTRACT)) {
    const validRoutes = Object.keys(API_CONTRACT).join(', ')
    throw new Error(
      `\n❌ CONTRACT VIOLATION\n` +
      `Route "${normalizedPath}" is not defined in API contract.\n` +
      `Valid routes: ${validRoutes}\n`
    )
  }
  
  const validMethods = API_CONTRACT[normalizedPath as ValidRoute]
  if (!validMethods.includes(method)) {
    throw new Error(
      `\n❌ CONTRACT VIOLATION\n` +
      `Method "${method}" is not allowed for route "${normalizedPath}".\n` +
      `Valid methods for ${normalizedPath}: ${validMethods.join(', ')}\n`
    )
  }
}