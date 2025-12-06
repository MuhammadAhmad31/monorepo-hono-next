/**
 * Auto-aggregator for all route modules
 * 
 * HOW TO ADD NEW ROUTES:
 * 1. Create new file: e.g., products.routes.ts
 * 2. Export: ProductsClientRoutes, ProductsApiRoutes, PRODUCTS_CONTRACT
 * 3. Import and add to exports below
 * 4. Done! Main routes.ts will auto-pick it up
 */

export * from './users.routes'
export * from './posts.routes'

import type { UsersClientRoutes, UsersApiRoutes } from './users.routes'
import type { PostsClientRoutes, PostsApiRoutes } from './posts.routes'
import { USERS_CONTRACT } from './users.routes'
import { POSTS_CONTRACT } from './posts.routes'

export type AllClientRoutes = 
  & UsersClientRoutes 
  & PostsClientRoutes
  // Add new client routes here:
  // & ProductsClientRoutes

export type AllApiRoutes = 
  & UsersApiRoutes 
  & PostsApiRoutes
  // Add new API routes here:
  // & ProductsApiRoutes

// ============================================
// Aggregated Contract
// ============================================

export const ALL_CONTRACTS = {
  ...USERS_CONTRACT,
  ...POSTS_CONTRACT,
  // Add new contracts here:
  // ...PRODUCTS_CONTRACT,
} as const