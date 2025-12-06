import { createApiClient } from 'shared'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = createApiClient(apiUrl)

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}