import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createUserSchema, updateUserSchema, userIdParamSchema } from 'shared/schemas'
import { createValidatedRoutes } from 'shared'
import { userController } from '../controllers/user.controller'

const userRoutes = new Hono()

const validator = createValidatedRoutes()
const routeUserValidated = validator.wrap(userRoutes, '/users')

routeUserValidated.get('/', (c) => userController.getAllUsers(c))

routeUserValidated.get(
  '/:id',
  zValidator('param', userIdParamSchema),
  (c) => userController.getUserById(c)
)

routeUserValidated.post(
  '/',
  zValidator('json', createUserSchema),
  (c) => userController.createUser(c)
)

routeUserValidated.put(
  '/:id',
  zValidator('param', userIdParamSchema),
  zValidator('json', updateUserSchema),
  (c) => userController.updateUser(c)
)

routeUserValidated.delete(
  '/:id',
  zValidator('param', userIdParamSchema),
  (c) => userController.deleteUser(c)
)

// ❌ UNCOMMENT ini untuk test - akan throw error saat startup:
// "PATCH is not allowed for route /users/:id"
// routeUserValidated.patch('/:id', (c) => {
//   return c.json({ error: 'Not allowed' })
// })

// ❌ UNCOMMENT ini untuk test - akan throw error saat startup:
// "Route /users/profile is not defined in API contract"
// routeUserValidated.get('/profile', (c) => {
//   return c.json({ error: 'Not allowed' })
// })

export { userRoutes, validator }