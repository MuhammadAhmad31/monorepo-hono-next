import type { HonoApiClient } from '../routes'
import type { UsersResponse, UserResponse, CreateUserInput, UpdateUserInput } from '../types/index.type'

export const usersApi = (client: HonoApiClient) => {
  return {
    getAll: async (): Promise<UsersResponse> => {
      const res = await client.api.users.$get()
      return res.json() as Promise<UsersResponse>
    },
    
    getById: async (id: string): Promise<UserResponse> => {
      const res = await client.api.users[':id'].$get({ 
        param: { id: id.toString() } 
      })
      return res.json() as Promise<UserResponse>
    },
    
    create: async (data: CreateUserInput): Promise<UserResponse> => {
      const res = await client.api.users.$post({ json: data })
      return res.json() as Promise<UserResponse>
    },
    
    update: async (id: string, data: UpdateUserInput): Promise<UserResponse> => {
      const res = await client.api.users[':id'].$put({ 
        param: { id: id.toString() },
        json: data
      })
      return res.json() as Promise<UserResponse>
    },
    
    delete: async (id: string): Promise<UserResponse> => {
      const res = await client.api.users[':id'].$delete({ 
        param: { id: id.toString() } 
      })
      return res.json() as Promise<UserResponse>
    },
  }
}