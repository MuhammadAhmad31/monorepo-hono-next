export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request') {
    super(400, message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(401, message)
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(403, message)
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(404, message)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(409, message)
    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string = 'Unprocessable Entity') {
    super(422, message)
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype)
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error') {
    super(500, message, false)
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service Unavailable') {
    super(503, message, false)
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype)
  }
}