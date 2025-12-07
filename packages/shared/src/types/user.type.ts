import type { ApiResponse, PaginatedResponse } from './api-response.types'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export type CreateUserInput = {
  name: string
  email: string
}

export type UpdateUserInput = {
  name?: string
  email?: string
}

export type UsersResponse = ApiResponse<User[]>
export type UserResponse = ApiResponse<User>
export type PaginatedUsersResponse = PaginatedResponse<User>