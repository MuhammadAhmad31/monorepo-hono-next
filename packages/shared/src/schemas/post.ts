import { z } from 'zod'
import { CreatePostInput, UpdatePostInput } from '../types/index.type'

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  published: z.boolean().optional().default(false),
  userId: z.string().uuid('User ID must be a valid UUID'),
}) satisfies z.ZodType<CreatePostInput>

export const updatePostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  content: z.string().min(10, 'Content must be at least 10 characters').optional(),
  published: z.boolean().optional(),
  userId: z.string().uuid('User ID must be a valid UUID').optional(),
}) satisfies z.ZodType<UpdatePostInput>

export const postIdParamSchema = z.object({
  id: z.string().uuid('Invalid post id'),
}) satisfies z.ZodType<{ id: string }>