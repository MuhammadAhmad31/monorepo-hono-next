import type { CreatePostInput, UpdatePostInput } from "../types/post.type"
import { 
  defineRouteContract, 
  createContractRegistry,
  type ManualClientRoute,
  type InferApiRoutes 
} from "./builder"

const postsContracts = [
  defineRouteContract({
    path: '/posts' as const,
    methods: ['GET', 'POST'] as const,
    bodies: {
      POST: {} as CreatePostInput,
    }
  }),
  defineRouteContract({
    path: '/posts/:id' as const,
    methods: ['GET', 'PUT', 'DELETE'] as const,
    bodies: {
      PUT: {} as UpdatePostInput,
    }
  }),
] as const

export type PostsClientRoutes = ManualClientRoute<
  'posts',
  CreatePostInput,
  UpdatePostInput
>

export type PostsApiRoutes = InferApiRoutes<typeof postsContracts>

export const POSTS_CONTRACT = createContractRegistry(postsContracts)