import type { Context } from 'hono'

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

export interface SuccessResponse<T = unknown> {
  status: 'success'
  message: string
  data: T
  meta?: {
    page?: number
    limit?: number
    total?: number
    [key: string]: any
  }
}

export interface ErrorResponse {
  status: 'error'
  message: string
  data?: null
  errors?: Array<{
    field: string
    message: string
  }>
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  meta: PaginationMeta
}

// Action types untuk generate message otomatis
type CrudAction = 'created' | 'updated' | 'deleted' | 'retrieved'
type ListAction = 'list'

/**
 * Generate success message dynamically
 * @example generateSuccessMessage('User', 'created') => "User created successfully"
 * @example generateSuccessMessage('Post', 'retrieved') => "Post retrieved successfully"
 */
export const generateSuccessMessage = (
  resource: string, 
  action: CrudAction | ListAction
): string => {
  if (action === 'list') {
    return `${resource}s retrieved successfully`
  }
  return `${resource} ${action} successfully`
}

/**
 * Generate error message dynamically
 * @example generateErrorMessage('User', 'not found') => "User not found"
 * @example generateErrorMessage('Email', 'already exists') => "Email already exists"
 */
export const generateErrorMessage = (
  resource: string,
  issue: string
): string => {
  return `${resource} ${issue}`
}

/**
 * Send success response with auto-generated message
 */
export const sendSuccess = <T>(
  c: Context,
  data: T,
  options: {
    resource: string
    action: CrudAction | ListAction
    statusCode?: HttpStatusCode
    meta?: SuccessResponse<T>['meta']
    customMessage?: string
  }
) => {
  const { resource, action, statusCode, meta, customMessage } = options
  
  const response: SuccessResponse<T> = {
    status: 'success',
    message: customMessage || generateSuccessMessage(resource, action),
    data,
    ...(meta && { meta })
  }
  
  const code = statusCode || (action === 'created' ? HttpStatusCode.CREATED : HttpStatusCode.OK)
  
  return c.json(response, code as any)
}

/**
 * Send error response with auto-generated message
 */
export const sendError = (
  c: Context,
  options: {
    resource?: string
    issue?: string
    statusCode?: HttpStatusCode
    customMessage?: string
    errors?: Array<{ field: string; message: string }>
  }
) => {
  const { resource, issue, statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, customMessage, errors } = options
  
  const message = customMessage || (resource && issue ? generateErrorMessage(resource, issue) : 'An error occurred')
  
  const response: ErrorResponse = {
    status: 'error',
    message,
    data: null,
    ...(errors && { errors })
  }
  
  return c.json(response, statusCode as any)
}

/**
 * Send paginated response with auto-generated message
 */
export const sendPaginated = <T>(
  c: Context,
  data: T[],
  options: {
    resource: string
    page: number
    limit: number
    total: number
    customMessage?: string
  }
) => {
  const { resource, page, limit, total, customMessage } = options
  
  const totalPages = Math.ceil(total / limit)
  const hasNext = page < totalPages
  const hasPrev = page > 1
  
  const response: PaginatedResponse<T> = {
    status: 'success',
    message: customMessage || generateSuccessMessage(resource, 'list'),
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev
    }
  }
  
  return c.json(response, HttpStatusCode.OK)
}

/**
 * Common error responses
 */
export const ErrorResponses = {
  notFound: (c: Context, resource: string) =>
    sendError(c, {
      resource,
      issue: 'not found',
      statusCode: HttpStatusCode.NOT_FOUND
    }),
  
  alreadyExists: (c: Context, resource: string) =>
    sendError(c, {
      resource,
      issue: 'already exists',
      statusCode: HttpStatusCode.CONFLICT
    }),
  
  invalidInput: (c: Context, errors?: Array<{ field: string; message: string }>) =>
    sendError(c, {
      customMessage: 'Invalid input data',
      statusCode: HttpStatusCode.BAD_REQUEST,
      errors
    }),
  
  unauthorized: (c: Context) =>
    sendError(c, {
      customMessage: 'Unauthorized access',
      statusCode: HttpStatusCode.UNAUTHORIZED
    }),
  
  forbidden: (c: Context) =>
    sendError(c, {
      customMessage: 'Access forbidden',
      statusCode: HttpStatusCode.FORBIDDEN
    }),
  
  internalError: (c: Context, message?: string) =>
    sendError(c, {
      customMessage: message || 'Internal server error',
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
    })
}

/**
 * Extract pagination params from query
 */
export const getPaginationParams = (c: Context) => {
  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '10')
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)), // Max 100 items per page
    skip: (Math.max(1, page) - 1) * Math.min(100, Math.max(1, limit))
  }
}