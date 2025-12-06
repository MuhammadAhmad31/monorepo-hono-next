import type { Context } from "hono"
import type { CreatePostInput, UpdatePostInput } from "../types/post.type"

// Client-side types
export type PostsClientRoutes = {
  posts: {
    $get: () => Promise<Response>
    $post: (args: { json: CreatePostInput }) => Promise<Response>
    ':id': {
      $get: (args: { param: { id: string } }) => Promise<Response>
      $put: (args: { param: { id: string }; json: UpdatePostInput }) => Promise<Response>
      $delete: (args: { param: { id: string } }) => Promise<Response>
    }
  }
}

// Server-side types
export type PostsApiRoutes = {
  '/posts': {
    GET: (c: Context) => Promise<Response> | Response
    POST: (c: Context) => Promise<Response> | Response
  }
  '/posts/:id': {
    GET: (c: Context) => Promise<Response> | Response
    PUT: (c: Context) => Promise<Response> | Response
    DELETE: (c: Context) => Promise<Response> | Response
  }
}

// Contract configuration
export const POSTS_CONTRACT = {
  '/posts': ['GET', 'POST'],
  '/posts/:id': ['GET', 'PUT', 'DELETE'],
} as const