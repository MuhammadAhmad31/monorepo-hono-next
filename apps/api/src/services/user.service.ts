import { prisma } from '../lib/prisma'
import type { CreateUserInput, UpdateUserInput, User } from 'shared'
import { NotFoundError, ConflictError, BadRequestError } from '../lib/errors'

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return users.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString()
    }))
  }

  async getUserById(id: string): Promise<User> {
    if (!id) throw new BadRequestError('Invalid user ID')

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundError('User not found')
    
    return {
      ...user,
      createdAt: user.createdAt.toISOString()
    }
  }

  async createUser(data: CreateUserInput): Promise<User> {
    if (!data.name?.trim()) throw new BadRequestError('Name is required')
    if (!data.email?.trim()) throw new BadRequestError('Email is required')

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })
    
    if (existingUser) throw new ConflictError('Email already exists')
    
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email
      }
    })
    
    return {
      ...user,
      createdAt: user.createdAt.toISOString()
    }
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    if (!id) throw new BadRequestError('Invalid user ID')
    if (!data.name && !data.email) {
      throw new BadRequestError('At least one field must be provided')
    }
    if (data.name !== undefined && !data.name.trim()) {
      throw new BadRequestError('Name cannot be empty')
    }
    if (data.email !== undefined && !data.email.trim()) {
      throw new BadRequestError('Email cannot be empty')
    }

    const existingUser = await prisma.user.findUnique({ where: { id } })
    if (!existingUser) throw new NotFoundError('User not found')
    
    if (data.email) {
      const emailExists = await prisma.user.findFirst({
        where: { 
          email: data.email,
          NOT: { id }
        }
      })
      
      if (emailExists) throw new ConflictError('Email already exists')
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email })
      }
    })
    
    return {
      ...user,
      createdAt: user.createdAt.toISOString()
    }
  }

  async deleteUser(id: string): Promise<User> {
    if (!id) throw new BadRequestError('Invalid user ID')

    const existingUser = await prisma.user.findUnique({ where: { id } })
    if (!existingUser) throw new NotFoundError('User not found')
    
    const user = await prisma.user.delete({ where: { id } })
    
    return {
      ...user,
      createdAt: user.createdAt.toISOString()
    }
  }
}

export const userService = new UserService()