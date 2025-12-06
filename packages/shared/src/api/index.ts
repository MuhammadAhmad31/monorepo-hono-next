import type { HonoApiClient } from '../routes'
import { usersApi } from './users'
import { postsApi } from './posts'

export function createApis(client: HonoApiClient) {
  return {
    users: usersApi(client),
    posts: postsApi(client),
  }
}

export type ApiModules = ReturnType<typeof createApis>
