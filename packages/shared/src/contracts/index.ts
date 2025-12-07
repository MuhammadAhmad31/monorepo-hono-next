export * from './builder'
export * from './users'
export * from './posts'

import type { UsersClientRoutes, UsersApiRoutes } from './users'
import type { PostsClientRoutes, PostsApiRoutes } from './posts'
import { USERS_CONTRACT } from './users'
import { POSTS_CONTRACT } from './posts'

export type AllClientRoutes = 
  & UsersClientRoutes 
  & PostsClientRoutes
  // Add new client routes:
  // & ProductsClientRoutes

export type AllApiRoutes = 
  & UsersApiRoutes 
  & PostsApiRoutes
  // Add new API routes:
  // & ProductsApiRoutes

// ============================================
// Aggregate All Contracts
// ============================================

export const ALL_CONTRACTS = {
  ...USERS_CONTRACT,
  ...POSTS_CONTRACT,
  // Add new contracts:
  // ...PRODUCTS_CONTRACT,
} as const