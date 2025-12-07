import type { Context } from 'hono'
import { AppError } from '../lib/errors'
import { HttpStatusCode, sendError } from '../../../../packages/shared/src/types/api-response.types'

export const errorHandler = (err: Error, c: Context) => {
  console.error('Error:', err)

  if (err instanceof AppError) {
    return sendError(c, {
      customMessage: err.message,
      statusCode: err.statusCode as HttpStatusCode
    })
  }

  return sendError(c, {
    customMessage: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
  })
}

export const asyncHandler = (fn: (c: Context) => Promise<any>) => {
  return async (c: Context) => {
    try {
      return await fn(c)
    } catch (error) {
      return errorHandler(error as Error, c)
    }
  }
}