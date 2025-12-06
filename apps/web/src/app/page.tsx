'use client'

import { useState, useEffect } from 'react'
import type { User, Post } from 'shared'
import { createUserSchema, createPostSchema } from 'shared'
import { api, handleApiError } from '../lib/api'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number>(1)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setError('')
      const [usersData, postsData] = await Promise.all([
        api.users.getAll(),
        api.posts.getAll()
      ])

      if (usersData.success) setUsers(usersData.users)
      if (postsData.success) setPosts(postsData.posts)
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setValidationErrors({})
    setError('')
    
    const result = createUserSchema.safeParse({
      name: userName,
      email: userEmail
    })
    
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message
        }
      })
      setValidationErrors(errors)
      return
    }
    
    try {
      const data = await api.users.create(result.data)
      
      if (data.success) {
        setUserName('')
        setUserEmail('')
        fetchData()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError(handleApiError(err))
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      setError('')
      const data = await api.users.delete(id)
      
      if (data.success) {
        fetchData()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError(handleApiError(err))
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setValidationErrors({})
    setError('')
    
    const result = createPostSchema.safeParse({
      title: postTitle,
      content: postContent,
      userId: selectedUserId
    })
    
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message
        }
      })
      setValidationErrors(errors)
      return
    }
    
    try {
      const data = await api.posts.create(result.data)
      
      if (data.success) {
        setPostTitle('')
        setPostContent('')
        fetchData()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError(handleApiError(err))
    }
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      setError('')
      const data = await api.posts.delete(id)
      
      if (data.success) {
        fetchData()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError(handleApiError(err))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🚀 Hono + Next.js Monorepo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Full-stack TypeScript with Shared Validation
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Users Section */}
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">👥 Users</h2>
          
          <form onSubmit={handleCreateUser} className="space-y-3 mb-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 ${
                  validationErrors.name ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 ${
                  validationErrors.email ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </form>

          <div className="space-y-3">
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users yet</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="p-4 border rounded-lg dark:border-gray-700 flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ID: {user.id} • Created: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">📝 Posts</h2>
          
          <form onSubmit={handleCreatePost} className="space-y-3 mb-6">
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              disabled={users.length === 0}
            >
              {users.length === 0 ? (
                <option>Create a user first</option>
              ) : (
                users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              )}
            </select>
            
            <div>
              <input
                type="text"
                placeholder="Post Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 ${
                  validationErrors.title ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.title && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
              )}
            </div>
            
            <div>
              <textarea
                placeholder="Post Content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 min-h-[100px] ${
                  validationErrors.content ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.content && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={users.length === 0}
            >
              Create Post
            </button>
          </form>

          <div className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No posts yet</p>
            ) : (
              posts.map((post) => {
                const author = users.find(u => u.id === post.userId)
                return (
                  <div key={post.id} className="p-4 border rounded-lg dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition text-xs"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.content}</p>
                    <div className="text-xs text-gray-500">
                      By: {author?.name || 'Unknown'} • 
                      ID: {post.id} • 
                      Created: {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      

      <div className="text-center text-sm text-gray-500">
        <p>✨ Built with Hono, Next.js, TypeScript, and Bun</p>
        <p className="mt-1">Using shared validation schemas between frontend & backend</p>
      </div>
    </main>
  )
}