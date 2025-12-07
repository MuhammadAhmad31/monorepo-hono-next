import type { CreateUserInput, UpdateUserInput } from "../types/user.type"
import { 
  defineRouteContract, 
  createContractRegistry,
  type ManualClientRoute,
  type InferApiRoutes 
} from "./builder"

const usersContracts = [
  defineRouteContract({
    path: '/users' as const,
    methods: ['GET', 'POST'] as const,
    bodies: {
      POST: undefined as any as CreateUserInput,
    }
  }),
  defineRouteContract({
    path: '/users/:id' as const,
    methods: ['GET', 'PUT', 'DELETE'] as const,
    bodies: {
      PUT: undefined as any as UpdateUserInput,
    }
  }),
] as const

export type UsersClientRoutes = ManualClientRoute<
  'users',
  CreateUserInput,
  UpdateUserInput
>

export type UsersApiRoutes = InferApiRoutes<typeof usersContracts>

export const USERS_CONTRACT = createContractRegistry(usersContracts)