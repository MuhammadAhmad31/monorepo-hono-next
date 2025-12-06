export interface Post {
  id: number
  title: string
  content: string
  userId: number
  createdAt: string
}

export type CreatePostInput = {
  title: string
  content: string
  userId: number
}

export type UpdatePostInput = {
  title?: string
  content?: string
  userId?: number
}

export type PostsResponse = 
  | { success: true; posts: Post[] }
  | { success: false; error: string }


export type PostResponse = 
  | { success: true; post: Post }
  | { success: false; error: string }
