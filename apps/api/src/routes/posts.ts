import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createPostSchema, updatePostSchema, postIdParamSchema } from 'shared'
import { createValidatedRoutes } from 'shared'
import { postController } from '../controllers/post.controller'

const postRoutes = new Hono()

const validator = createValidatedRoutes()
const postRoutesValidated = validator.wrap(postRoutes, '/posts')

postRoutesValidated.get('/', postController.getAllPosts)

postRoutesValidated.get(
  '/:id',
  zValidator('param', postIdParamSchema),
  postController.getPostById
)

postRoutesValidated.post(
  '/',
  zValidator('json', createPostSchema),
  postController.createPost
)

postRoutesValidated.put(
  '/:id',
  zValidator('param', postIdParamSchema),
  zValidator('json', updatePostSchema),
  postController.updatePost
)

postRoutesValidated.delete(
  '/:id',
  zValidator('param', postIdParamSchema),
  postController.deletePost
)

export { postRoutes, validator }