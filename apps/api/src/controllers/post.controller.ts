import type { Context } from 'hono'
import { sendSuccess, type CreatePostInput, type UpdatePostInput } from 'shared/types'
import { postService } from '../services/post.service'
import { asyncHandler } from '../middlewares/error-handler.middleware'

export class PostController {
  getAllPosts = asyncHandler(async (c: Context) => {
    const published = c.req.query('published')
    const publishedFilter = published === 'true' ? true : published === 'false' ? false : undefined
    
    const posts = await postService.getAllPosts(publishedFilter)
    return sendSuccess(c, posts, { resource: 'Post', action: 'list' })
  })

  getPostById = asyncHandler(async (c: Context) => {
    const { id } = c.req.valid<{ id: string }>('param')
    const post = await postService.getPostById(id)
    return sendSuccess(c, post, { resource: 'Post', action: 'retrieved' })
  })

  getPostsByUser = asyncHandler(async (c: Context) => {
    const { userId } = c.req.valid<{ userId: string }>('param')
    const posts = await postService.getPostsByUser(userId)
    return sendSuccess(c, posts, { resource: 'Post', action: 'list' })
  })

  createPost = asyncHandler(async (c: Context) => {
    const data = c.req.valid<CreatePostInput>('json')
    const post = await postService.createPost(data)
    return sendSuccess(c, post, { resource: 'Post', action: 'created' })
  })

  updatePost = asyncHandler(async (c: Context) => {
    const { id } = c.req.valid<{ id: string }>('param')
    const data = c.req.valid<UpdatePostInput>('json')
    const post = await postService.updatePost(id, data)
    return sendSuccess(c, post, { resource: 'Post', action: 'updated' })
  })

  deletePost = asyncHandler(async (c: Context) => {
    const { id } = c.req.valid<{ id: string }>('param')
    const post = await postService.deletePost(id)
    return sendSuccess(c, post, { resource: 'Post', action: 'deleted' })
  })
}

export const postController = new PostController()