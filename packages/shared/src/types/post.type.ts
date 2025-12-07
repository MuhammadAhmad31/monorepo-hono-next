import { ApiResponse, PaginatedResponse } from "./api-response.types"

export interface Post {
  id: string
  title: string
  content: string
  published: boolean
  userId: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export interface CreatePostInput {
  title: string
  content: string
  published?: boolean
  userId: string
}

export interface UpdatePostInput {
  title?: string
  content?: string
  published?: boolean
}
export type PostsResponse = ApiResponse<Post[]>
export type PostResponse = ApiResponse<Post>
export type PaginatedPostsResponse = PaginatedResponse<Post>
