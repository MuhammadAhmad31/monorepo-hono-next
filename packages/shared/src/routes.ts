/**
 * Main routes configuration
 * This file rarely needs changes - all route definitions in routes/ folder
 */

import type { AllClientRoutes, AllApiRoutes } from './routes/index.routes'
import { ALL_CONTRACTS } from './routes/index.routes'

// ============================================
// Client-side types (untuk hono/client)
// ============================================

export type HonoApiClient = {
  api: AllClientRoutes
}

// ============================================
// Server-side types (untuk backend Hono)
// ============================================

export type ApiRoutes = AllApiRoutes

export type ValidRoute = keyof ApiRoutes
export type ValidMethod<T extends ValidRoute> = keyof ApiRoutes[T]

// ============================================
// API Contract Configuration
// ============================================

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * Complete API contract - auto-aggregated from all route modules
 */
export const API_CONTRACT: Record<ValidRoute, readonly HTTPMethod[]> = ALL_CONTRACTS

// Re-export all route types for convenience
export * from './routes/index.routes'