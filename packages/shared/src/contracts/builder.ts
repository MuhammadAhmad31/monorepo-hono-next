import type { Context } from "hono"

// ============================================
// Core Types
// ============================================

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type RouteHandler = (c: Context) => Promise<Response> | Response

// Extract params dari path seperti :id -> { id: string }
type ExtractParams<T extends string> = 
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : never

// ============================================
// Client-side Types Builder
// ============================================

type BuildClientMethod<
  TPath extends string,
  TMethod extends HTTPMethod,
  TBody = never
> = [TBody] extends [never]
  ? [ExtractParams<TPath>] extends [never]
    ? () => Promise<Response>
    : (args: { param: ExtractParams<TPath> }) => Promise<Response>
  : [ExtractParams<TPath>] extends [never]
  ? (args: { json: TBody }) => Promise<Response>
  : (args: { param: ExtractParams<TPath>; json: TBody }) => Promise<Response>

// ============================================
// API-side Types Builder
// ============================================

type BuildApiRoute<TMethods extends readonly HTTPMethod[]> = {
  [K in TMethods[number]]: RouteHandler
}

// ============================================
// Route Contract Definition
// ============================================

export interface RouteContract<
  TPath extends string = string,
  TMethods extends readonly HTTPMethod[] = readonly HTTPMethod[],
  TBodies extends Partial<Record<HTTPMethod, any>> = {}
> {
  path: TPath
  methods: TMethods
  bodies: TBodies
}

export const defineRouteContract = <
  TPath extends string,
  TMethods extends readonly HTTPMethod[],
  TBodies extends Partial<Record<HTTPMethod, any>> = {}
>(config: {
  path: TPath
  methods: TMethods
  bodies?: TBodies
}): RouteContract<TPath, TMethods, TBodies> => {
  return {
    path: config.path,
    methods: config.methods,
    bodies: (config.bodies ?? {}) as TBodies,
  }
}

// ============================================
// Manual Client Route Builder (for reliability)
// ============================================

/**
 * Define client routes manually with explicit body types
 * 
 * @template TBasePath - Resource name (e.g., 'users', 'posts')
 * @template TListGetBody - Body type for GET / (default: never = no body)
 * @template TListPostBody - Body type for POST / (default: never = no body)
 * @template TDetailPutBody - Body type for PUT /:id (default: never = no body)
 * @template TDetailDeleteBody - Body type for DELETE /:id (default: never = no body)
 * 
 * @example
 * ```typescript
 * // Define users routes with CreateUserInput for POST, UpdateUserInput for PUT
 * export type UsersClientRoutes = ManualClientRoute<
 *   'users',
 *   never,              // GET /users has no body
 *   CreateUserInput,    // POST /users requires CreateUserInput
 *   UpdateUserInput,    // PUT /users/:id requires UpdateUserInput
 *   never               // DELETE /users/:id has no body
 * >
 * ```
 */
export type ManualClientRoute<
  TBasePath extends string,
  TListPostBody = never,
  TDetailPutBody = never,
> = {
  [K in TBasePath]: {
    $get: () => Promise<Response>
    $post: [TListPostBody] extends [never] ? never : (args: { json: TListPostBody }) => Promise<Response>
    ':id': {
      $get: (args: { param: { id: string } }) => Promise<Response>
      $put: [TDetailPutBody] extends [never] ? never : (args: { param: { id: string }; json: TDetailPutBody }) => Promise<Response>
      $delete: (args: { param: { id: string } }) => Promise<Response>
    }
  }
}

// ============================================
// Type Inference Helpers (Auto-generation)
// ============================================

// Extract base path name
type ExtractBasePath<T extends string> = 
  T extends `/${infer Base}/:${string}`
    ? Base
    : T extends `/${infer Base}`
    ? Base
    : never

// Check if path has params
type HasParams<T extends string> = T extends `${string}:${string}` ? true : false

// Build methods for a contract
type BuildMethodsForContract<
  TContract extends RouteContract
> = {
  [M in TContract['methods'][number] as `$${Lowercase<M>}`]: 
    M extends keyof TContract['bodies']
      ? BuildClientMethod<TContract['path'], M, TContract['bodies'][M]>
      : BuildClientMethod<TContract['path'], M, never>
}

// Build routes for contracts with same base
type BuildRoutesForBase<
  TContracts extends readonly RouteContract[],
  TBase extends string
> = TContracts extends readonly [infer First extends RouteContract, ...infer Rest extends readonly RouteContract[]]
  ? ExtractBasePath<First['path']> extends TBase
    ? HasParams<First['path']> extends true
      ? BuildMethodsForContract<First> & {
          [K in Extract<First['path'], `/${string}:${string}`> as `:${string & ExtractParams<K> extends { [key: string]: string } ? Extract<keyof ExtractParams<K>, string> : never}`]: BuildMethodsForContract<First>
        } & BuildRoutesForBase<Rest, TBase>
      : BuildMethodsForContract<First> & BuildRoutesForBase<Rest, TBase>
    : BuildRoutesForBase<Rest, TBase>
  : {}

// Get all unique base paths
type GetBasePaths<T extends readonly RouteContract[]> = {
  [K in keyof T]: T[K] extends RouteContract ? ExtractBasePath<T[K]['path']> : never
}[number]

// Main client routes type (auto-generated, but may be complex)
export type InferClientRoutes<T extends readonly RouteContract[]> = {
  [Base in GetBasePaths<T>]: BuildRoutesForBase<T, Base>
}

// API routes type (auto-generated, works well)
export type InferApiRoutes<T extends readonly RouteContract[]> = {
  [K in T[number] as K['path']]: BuildApiRoute<K['methods']>
}

// ============================================
// Contract Registry
// ============================================

export const createContractRegistry = <T extends readonly RouteContract[]>(
  contracts: T
): { [K in T[number] as K['path']]: K['methods'] } => {
  return contracts.reduce((acc, contract) => {
    acc[contract.path] = contract.methods
    return acc
  }, {} as any)
}