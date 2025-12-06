import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import type { User, UsersResponse, UserResponse } from 'shared'
import { createUserSchema, updateUserSchema, userIdParamSchema } from 'shared'
import { createValidatedRoutes } from 'shared'

const userRoutes = new Hono()

const validator = createValidatedRoutes()
const routeUserValidated = validator.wrap(userRoutes, '/users')

let users: User[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    createdAt: new Date().toISOString() 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    createdAt: new Date().toISOString() 
  },
]

let nextId = 3

routeUserValidated.get('/', (c) => {
  const response: UsersResponse = {
    success: true,
    users
  }
  return c.json(response)
})

routeUserValidated.get(
  '/:id',
  zValidator('param', userIdParamSchema),
  (c) => {
    const { id } = c.req.valid('param')
    const user = users.find((u) => u.id === parseInt(id))
    
    if (!user) {
      const response: UserResponse = { 
        success: false,
        error: 'User not found' 
      }
      return c.json(response, 404)
    }
    
    const response: UserResponse = {
      success: true,
      user
    }
    return c.json(response)
  }
)

routeUserValidated.post(
  '/',
  zValidator('json', createUserSchema),
  (c) => {
    const data = c.req.valid('json')
    
    const existingUser = users.find(u => u.email === data.email)
    if (existingUser) {
      const response: UserResponse = {
        success: false,
        error: 'Email already exists'
      }
      return c.json(response, 400)
    }
    
    const newUser: User = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString(),
    }
    
    users.push(newUser)
    
    const response: UserResponse = {
      success: true,
      user: newUser
    }
    return c.json(response, 201)
  }
)

routeUserValidated.put(
  '/:id',
  zValidator('param', userIdParamSchema),
  zValidator('json', updateUserSchema),
  (c) => {
    const { id } = c.req.valid('param')
    const data = c.req.valid('json')
    const userId = parseInt(id)
    const index = users.findIndex((u) => u.id === userId)
    
    if (index === -1) {
      const response: UserResponse = { 
        success: false,
        error: 'User not found' 
      }
      return c.json(response, 404)
    }
    
    if (data.email) {
      const existingUser = users.find(u => u.email === data.email && u.id !== userId)
      if (existingUser) {
        const response: UserResponse = {
          success: false,
          error: 'Email already exists'
        }
        return c.json(response, 400)
      }
    }
    
    const updatedUser: User = {
      ...users[index],
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email })
    }
    
    users[index] = updatedUser
    
    const response: UserResponse = {
      success: true,
      user: updatedUser
    }
    return c.json(response)
  }
)

routeUserValidated.delete(
  '/:id',
  zValidator('param', userIdParamSchema),
  (c) => {
    const { id } = c.req.valid('param')
    const userId = parseInt(id)
    const index = users.findIndex((u) => u.id === userId)
    
    if (index === -1) {
      const response: UserResponse = { 
        success: false,
        error: 'User not found' 
      }
      return c.json(response, 404)
    }
    
    const [deletedUser] = users.splice(index, 1)
    
    const response: UserResponse = {
      success: true,
      user: deletedUser
    }
    return c.json(response)
  }
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