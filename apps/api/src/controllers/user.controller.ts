import type { Context } from 'hono'
import { userService } from '../services/user.service'
import { asyncHandler } from '../middlewares/error-handler.middleware'
import { CreateUserInput, sendSuccess, UpdateUserInput } from 'shared/types'
import { log } from 'shared/lib'

export class UserController {
  getAllUsers = asyncHandler(async (c: Context) => {
    const users = await userService.getAllUsers()
    log('info', `Fetched ${users.length} users`)
    return sendSuccess(c, users, { resource: 'User', action: 'list' })
  })

  getUserById = asyncHandler(async (c: Context) => {
    const { id } = c.req.valid<{ id: string }>('param')
    const user = await userService.getUserById(id)
    log('info', `Retrieved user with ID: ${id}`)
    return sendSuccess(c, user, { resource: 'User', action: 'retrieved' })
  })

  createUser = asyncHandler(async (c: Context) => {
    const data = c.req.valid<CreateUserInput>('json')
    const user = await userService.createUser(data)
    return sendSuccess(c, user, { resource: 'User', action: 'created' })
  })

  updateUser = asyncHandler(async (c: Context) => {
    const { id } = c.req.valid<{ id: string }>('param')
    const data = c.req.valid<UpdateUserInput>('json')
    const user = await userService.updateUser(id, data)
    return sendSuccess(c, user, { resource: 'User', action: 'updated' })
  })

  deleteUser = asyncHandler(async (c: Context) => {
    const { id } = c.req.valid<{ id: string }>('param')
    const user = await userService.deleteUser(id)
    return sendSuccess(c, user, { resource: 'User', action: 'deleted' })
  })
}

export const userController = new UserController()