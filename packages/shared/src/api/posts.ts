import type { HonoApiClient } from '../routes'
import type { PostsResponse, PostResponse, CreatePostInput, UpdatePostInput } from '../types/index.type'

export function postsApi(client: HonoApiClient) {
  return {
    getAll: async (): Promise<PostsResponse> => {
      const res = await client.api.posts.$get()
      return res.json() as Promise<PostsResponse>
    },
    
    getById: async (id: string): Promise<PostResponse> => {
      const res = await client.api.posts[':id'].$get({ 
        param: { id: id.toString() } 
      })
      return res.json() as Promise<PostResponse>
    },
    
    create: async (data: CreatePostInput): Promise<PostResponse> => {
      const res = await client.api.posts.$post({ json: data })
      return res.json() as Promise<PostResponse>
    },
    
    update: async (id: string, data: UpdatePostInput): Promise<PostResponse> => {
      const res = await client.api.posts[':id'].$put({ 
        param: { id: id.toString() },
        json: data
      })
      return res.json() as Promise<PostResponse>
    },
    
    delete: async (id: string): Promise<PostResponse> => {
      const res = await client.api.posts[':id'].$delete({ 
        param: { id: id.toString() } 
      })
      return res.json() as Promise<PostResponse>
    },
  }
}
