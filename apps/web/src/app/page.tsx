'use client'

import { useState, useEffect } from 'react'
import type { User, Post } from 'shared'
import { createUserSchema, createPostSchema } from 'shared'
import { api, handleApiError } from '@/lib/api'

// Custom Hooks
function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const fetchUsers = async () => {
    try {
      setError('')
      const response = await api.users.getAll()
      
      if (response.status === 'success') {
        setUsers(response.data)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (data: { name: string; email: string }) => {
    try {
      const response = await api.users.create(data)
      
      if (response.status === 'success') {
        await fetchUsers()
        return { success: true }
      } else {
        setError(response.message)
        return { success: false, error: response.message }
      }
    } catch (err) {
      const errorMsg = handleApiError(err)
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const response = await api.users.delete(id)
      
      if (response.status === 'success') {
        await fetchUsers()
        return { success: true }
      } else {
        setError(response.message)
        return { success: false }
      }
    } catch (err) {
      setError(handleApiError(err))
      return { success: false }
    }
  }

  return { users, loading, error, setError, fetchUsers, createUser, deleteUser }
}

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const fetchPosts = async () => {
    try {
      setError('')
      const response = await api.posts.getAll()
      
      if (response.status === 'success') {
        setPosts(response.data)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (data: { title: string; content: string; published: boolean; userId: string }) => {
    try {
      const response = await api.posts.create(data)
      
      if (response.status === 'success') {
        await fetchPosts()
        return { success: true }
      } else {
        setError(response.message)
        return { success: false, error: response.message }
      }
    } catch (err) {
      const errorMsg = handleApiError(err)
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  const deletePost = async (id: string) => {
    try {
      const response = await api.posts.delete(id)
      
      if (response.status === 'success') {
        await fetchPosts()
        return { success: true }
      } else {
        setError(response.message)
        return { success: false }
      }
    } catch (err) {
      setError(handleApiError(err))
      return { success: false }
    }
  }

  return { posts, loading, error, setError, fetchPosts, createPost, deletePost }
}

// Components
function ErrorAlert({ error, onClose }: { error: string; onClose: () => void }) {
  if (!error) return null
  
  return (
    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg flex justify-between items-start">
      <span>{error}</span>
      <button 
        onClick={onClose}
        className="text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 font-bold"
      >
        ✕
      </button>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <div className="text-xl">Loading...</div>
      </div>
    </div>
  )
}

function UserForm({ 
  onSubmit, 
  loading 
}: { 
  onSubmit: (data: { name: string; email: string }) => Promise<void>
  loading: boolean 
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors({})
    
    const result = createUserSchema.safeParse({ name, email })
    
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
    
    await onSubmit(result.data)
    setName('')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 ${
            validationErrors.name ? 'border-red-500' : ''
          }`}
          disabled={loading}
        />
        {validationErrors.name && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
        )}
      </div>
      
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 ${
            validationErrors.email ? 'border-red-500' : ''
          }`}
          disabled={loading}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
        )}
      </div>
      
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding User...' : 'Add User'}
      </button>
    </form>
  )
}

function UserCard({ user, onDelete }: { user: User; onDelete: (id: string) => void }) {
  const formatUUID = (uuid: string) => uuid.substring(0, 8)
  
  return (
    <div className="p-4 border rounded-lg dark:border-gray-700 flex justify-between items-start">
      <div className="flex-1">
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
        <div className="text-xs text-gray-500 mt-1 font-mono">
          ID: {formatUUID(user.id)}... • {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>
      <button
        onClick={() => {
          if (confirm('Are you sure? This will delete all their posts too.')) {
            onDelete(user.id)
          }
        }}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm flex-shrink-0 ml-2"
      >
        Delete
      </button>
    </div>
  )
}

function PostForm({ 
  users,
  onSubmit,
  loading 
}: { 
  users: User[]
  onSubmit: (data: { title: string; content: string; published: boolean; userId: string }) => Promise<void>
  loading: boolean 
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [userId, setUserId] = useState<string>('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (users.length > 0 && !userId) {
      setUserId(users[0]!.id)
    }
  }, [users, userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors({})
    
    if (!userId) return
    
    const result = createPostSchema.safeParse({ title, content, published, userId })
    
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
    
    await onSubmit(result.data)
    setTitle('')
    setContent('')
    setPublished(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          disabled={users.length === 0 || loading}
        >
          {users.length === 0 ? (
            <option>Create a user first</option>
          ) : (
            users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))
          )}
        </select>
      </div>
      
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 ${
            validationErrors.title ? 'border-red-500' : ''
          }`}
          disabled={loading}
        />
        {validationErrors.title && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
        )}
      </div>
      
      <div>
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 min-h-[100px] ${
            validationErrors.content ? 'border-red-500' : ''
          }`}
          disabled={loading}
        />
        {validationErrors.content && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          disabled={loading}
        />
        <label htmlFor="published" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Publish immediately
        </label>
      </div>
      
      <button 
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={users.length === 0 || loading}
      >
        {loading ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
  )
}

function PostCard({ post, users, onDelete }: { post: Post; users: User[]; onDelete: (id: string) => void }) {
  const formatUUID = (uuid: string) => uuid.substring(0, 8)
  const author = users.find(u => u.id === post.userId)
  
  return (
    <div className="p-4 border rounded-lg dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{post.title}</h3>
          <span className={`text-xs px-2 py-1 rounded ${
            post.published 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {post.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this post?')) {
              onDelete(post.id)
            }
          }}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition text-xs shrink-0"
        >
          Delete
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
        {post.content}
      </p>
      <div className="text-xs text-gray-500 font-mono">
        By: {author?.name || 'Unknown'} • 
        ID: {formatUUID(post.id)}... • 
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}

// Main Component
export default function Home() {
  const userHook = useUsers()
  const postHook = usePosts()
  const [creatingUser, setCreatingUser] = useState(false)
  const [creatingPost, setCreatingPost] = useState(false)

  useEffect(() => {
    userHook.fetchUsers()
    postHook.fetchPosts()
  }, [])

  const handleCreateUser = async (data: { name: string; email: string }) => {
    setCreatingUser(true)
    await userHook.createUser(data)
    setCreatingUser(false)
  }

  const handleCreatePost = async (data: { title: string; content: string; published: boolean; userId: string }) => {
    setCreatingPost(true)
    await postHook.createPost(data)
    setCreatingPost(false)
  }

  if (userHook.loading || postHook.loading) {
    return <LoadingSpinner />
  }

  const globalError = userHook.error || postHook.error

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🚀 Hono + Next.js Monorepo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Full-stack TypeScript with Shared Validation & UUID
        </p>
      </div>

      <ErrorAlert 
        error={globalError} 
        onClose={() => {
          userHook.setError('')
          postHook.setError('')
        }} 
      />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Users Section */}
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
            <span>👥 Users</span>
            <span className="text-sm font-normal text-gray-500">
              {userHook.users.length} total
            </span>
          </h2>
          
          <UserForm onSubmit={handleCreateUser} loading={creatingUser} />

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {userHook.users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users yet</p>
            ) : (
              userHook.users.map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onDelete={userHook.deleteUser} 
                />
              ))
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
            <span>📝 Posts</span>
            <span className="text-sm font-normal text-gray-500">
              {postHook.posts.length} total
            </span>
          </h2>
          
          <PostForm 
            users={userHook.users} 
            onSubmit={handleCreatePost} 
            loading={creatingPost} 
          />

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {postHook.posts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No posts yet</p>
            ) : (
              postHook.posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  users={userHook.users}
                  onDelete={postHook.deletePost} 
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>✨ Built with Hono, Next.js, TypeScript, Prisma & Bun</p>
        <p className="mt-1">Using shared validation schemas and UUID for security</p>
      </div>
    </main>
  )
}