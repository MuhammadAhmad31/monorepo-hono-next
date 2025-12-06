import type { Context } from "hono"
import type { CreateUserInput, UpdateUserInput } from "../types/user.type"

// Client-side types
export type UsersClientRoutes = {
  users: {
    $get: () => Promise<Response>
    $post: (args: { json: CreateUserInput }) => Promise<Response>
    ':id': {
      $get: (args: { param: { id: string } }) => Promise<Response>
      $put: (args: { param: { id: string }; json: UpdateUserInput }) => Promise<Response>
      $delete: (args: { param: { id: string } }) => Promise<Response>
    }
  }
}

// Server-side types
export type UsersApiRoutes = {
  '/users': {
    GET: (c: Context) => Promise<Response> | Response
    POST: (c: Context) => Promise<Response> | Response
  }
  '/users/:id': {
    GET: (c: Context) => Promise<Response> | Response
    PUT: (c: Context) => Promise<Response> | Response
    DELETE: (c: Context) => Promise<Response> | Response
  }
}

// Contract configuration
export const USERS_CONTRACT = {
  '/users': ['GET', 'POST'],
  '/users/:id': ['GET', 'PUT', 'DELETE'],
} as const