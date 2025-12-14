import { prisma } from '../lib/prisma'
import { NotFoundError, BadRequestError } from '../lib/errors'
import type { CreatePostInput, Post, UpdatePostInput } from 'shared/types'

export class PostService {
  async getAllPosts(published?: boolean): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    return posts.map(this.mapPostToResponse)
  }

  async getPostById(id: string): Promise<Post> {
    this.validateUUID(id, 'post')

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    if (!post) throw new NotFoundError('Post not found')
    
    return this.mapPostToResponse(post)
  }

  async getPostsByUser(userId: string): Promise<Post[]> {
    this.validateUUID(userId, 'user')

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundError('User not found')

    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    return posts.map(this.mapPostToResponse)
  }

  async createPost(data: CreatePostInput): Promise<Post> {
    if (!data.title?.trim()) throw new BadRequestError('Title is required')
    if (!data.content?.trim()) throw new BadRequestError('Content is required')
    this.validateUUID(data.userId, 'user')

    const user = await prisma.user.findUnique({ where: { id: data.userId } })
    if (!user) throw new NotFoundError('User not found')

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? false,
        userId: data.userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    return this.mapPostToResponse(post)
  }

  async updatePost(id: string, data: UpdatePostInput): Promise<Post> {
    this.validateUUID(id, 'post')

    if (!data.title && !data.content && data.published === undefined) {
      throw new BadRequestError('At least one field must be provided')
    }

    if (data.title !== undefined && !data.title.trim()) {
      throw new BadRequestError('Title cannot be empty')
    }

    if (data.content !== undefined && !data.content.trim()) {
      throw new BadRequestError('Content cannot be empty')
    }

    const existingPost = await prisma.post.findUnique({ where: { id } })
    if (!existingPost) throw new NotFoundError('Post not found')
    
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.published !== undefined && { published: data.published })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    return this.mapPostToResponse(post)
  }

  async deletePost(id: string): Promise<Post> {
    this.validateUUID(id, 'post')

    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    if (!existingPost) throw new NotFoundError('Post not found')
    
    await prisma.post.delete({ where: { id } })
    
    return this.mapPostToResponse(existingPost)
  }

  private validateUUID(uuid: string, resourceName: string): void {
    if (!uuid) {
      throw new BadRequestError(`Invalid ${resourceName} ID`)
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(uuid)) {
      throw new BadRequestError(`Invalid ${resourceName} ID format`)
    }
  }

  private mapPostToResponse(post: any): Post {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      userId: post.userId,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      user: post.user
    }
  }
}

export const postService = new PostService()