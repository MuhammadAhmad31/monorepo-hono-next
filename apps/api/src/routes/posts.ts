import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import type { Post, PostsResponse, PostResponse } from 'shared'
import { createPostSchema, updatePostSchema, postIdParamSchema } from 'shared'
import { createValidatedRoutes } from 'shared'

const postRoutes = new Hono()

const validator = createValidatedRoutes()
const postRoutesValidated = validator.wrap(postRoutes, '/posts')

let posts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the first post',
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the second post',
    userId: 2,
    createdAt: new Date().toISOString(),
  },
]

let nextId = 3

postRoutesValidated.get('/', (c) => {
  const response: PostsResponse = {
    success: true,
    posts,
  }
  return c.json(response)
})

postRoutesValidated.get(
  '/:id',
  zValidator('param', postIdParamSchema),
  (c) => {
    const { id } = c.req.valid('param')
    const post = posts.find((p) => p.id === parseInt(id))

    if (!post) {
      const response: PostResponse = {
        success: false,
        error: 'Post not found',
      }
      return c.json(response, 404)
    }

    const response: PostResponse = {
      success: true,
      post,
    }
    return c.json(response)
  }
)

postRoutesValidated.post(
  '/',
  zValidator('json', createPostSchema),
  (c) => {
    const data = c.req.valid('json')

    const newPost: Post = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString(),
    }

    posts.push(newPost)

    const response: PostResponse = {
      success: true,
      post: newPost,
    }
    return c.json(response, 201)
  }
)

postRoutesValidated.put(
  '/:id',
  zValidator('param', postIdParamSchema),
  zValidator('json', updatePostSchema),
  (c) => {
    const { id } = c.req.valid('param')
    const data = c.req.valid('json')
    const postId = parseInt(id)
    const index = posts.findIndex((p) => p.id === postId)

    if (index === -1) {
      const response: PostResponse = {
        success: false,
        error: 'Post not found',
      }
      return c.json(response, 404)
    }

    const updatedPost: Post = {
      ...posts[index],
      ...(data.title !== undefined && { title: data.title }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.userId !== undefined && { userId: data.userId }),
    }

    posts[index] = updatedPost

    const response: PostResponse = {
      success: true,
      post: updatedPost,
    }
    return c.json(response)
  }
)

postRoutesValidated.delete(
  '/:id',
  zValidator('param', postIdParamSchema),
  (c) => {
    const { id } = c.req.valid('param')
    const postId = parseInt(id)
    const index = posts.findIndex((p) => p.id === postId)

    if (index === -1) {
      const response: PostResponse = {
        success: false,
        error: 'Post not found',
      }
      return c.json(response, 404)
    }

    const [deletedPost] = posts.splice(index, 1)

    const response: PostResponse = {
      success: true,
      post: deletedPost,
    }
    return c.json(response)
  }
)

export { postRoutes, validator }