import { z } from 'zod'
import { CreatePostInput, UpdatePostInput } from '../types/index.type'

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  userId: z.number().int().positive('User ID must be a positive integer'),
}) satisfies z.ZodType<CreatePostInput>

export const updatePostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  content: z.string().min(10, 'Content must be at least 10 characters').optional(),
  userId: z.number().int().positive('User ID must be a positive integer').optional(),
}) satisfies z.ZodType<UpdatePostInput>

export const postIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
}) satisfies z.ZodType<{ id: string }>