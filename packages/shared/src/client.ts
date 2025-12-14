import { hc } from 'hono/client'
import type { HonoApiClient } from './routes'
import { createApis } from './api'

export const createApiClient = (baseUrl: string) => {
  const _client = hc(baseUrl) as unknown as HonoApiClient
  
  return {
    raw: _client,
    ...createApis(_client),
  }
}

export type ApiClient = ReturnType<typeof createApiClient>
