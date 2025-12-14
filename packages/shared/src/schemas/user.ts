import { z } from 'zod'
import { CreateUserInput, UpdateUserInput } from '../types/index.type'

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
}) satisfies z.ZodType<CreateUserInput>

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
}) satisfies z.ZodType<UpdateUserInput>

export const userIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a string'),
}) satisfies z.ZodType<{ id: string }>