"use client";

import { VirtualGrid, VirtualScroll } from "components/global";
import { useEffect, useState } from "react";

type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function VirtualScrollDemoPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'posts' | 'users' | 'comments'>('photos');
  
  // State for data
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from JSONPlaceholder API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [photosRes, postsRes, usersRes, commentsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/photos'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/comments'),
        ]);

        const [photosData, postsData, usersData, commentsData] = await Promise.all([
          photosRes.json(),
          postsRes.json(),
          usersRes.json(),
          commentsRes.json(),
        ]);

        setPhotos(photosData);
        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
      } catch (err) {
        setError('Failed to fetch data from API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading data from API...</div>
          <div className="text-sm text-gray-500 mt-2">Fetching from JSONPlaceholder</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-600 text-xl font-semibold mb-2">❌ Error</div>
          <div className="text-red-800">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            🚀 Virtual Scroll Demo
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            High-performance virtualization with real API data
          </p>
          <p className="text-sm text-gray-500">
            Data from <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">JSONPlaceholder API</a>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600">{photos.length}</div>
            <div className="text-sm text-gray-600">Photos</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600">{posts.length}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600">{users.length}</div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-orange-600">{comments.length}</div>
            <div className="text-sm text-gray-600">Comments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-md">
          {[
            { key: 'photos', label: '📷 Photos Grid', count: photos.length, color: 'blue' },
            { key: 'posts', label: '📝 Posts Feed', count: posts.length, color: 'green' },
            { key: 'users', label: '👥 Users List', count: users.length, color: 'purple' },
            { key: 'comments', label: '💬 Comments', count: comments.length, color: 'orange' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.key
                  ? `bg-${tab.color}-500 text-white shadow-lg scale-105`
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div>{tab.label}</div>
              <div className="text-xs mt-1 opacity-80">
                {tab.count.toLocaleString()} items
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          {activeTab === 'photos' && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                📷 Photo Gallery - Virtual Grid
              </h2>
              <p className="text-gray-600 mb-4">
                Browsing <strong>{photos.length.toLocaleString()}</strong> photos in a 4-column grid. 
                Only ~20 items rendered in DOM for optimal performance.
              </p>
              <VirtualGrid
                items={photos}
                height="650px"
                columns={4}
                estimatedItemHeight={280}
                gap={16}
                renderItem={(photo) => (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:scale-105">
                    <img
                      src={`https://picsum.photos/200/200?random=${photo.id}`}
                      alt={photo.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate" title={photo.title}>
                        {photo.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">ID: {photo.id}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {activeTab === 'posts' && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                📝 Blog Posts - Virtual List
              </h2>
              <p className="text-gray-600 mb-4">
                Reading through <strong>{posts.length.toLocaleString()}</strong> blog posts. 
                Smooth scrolling with virtual rendering.
              </p>
              <VirtualScroll
                items={posts}
                height="650px"
                estimatedItemHeight={140}
                gap={12}
                renderItem={(post) => (
                  <div className="bg-linear-to-br from-white to-green-50 border border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">
                            Post #{post.id}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            User {post.userId}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2 capitalize">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {post.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                👥 Users Directory - Virtual Cards
              </h2>
              <p className="text-gray-600 mb-4">
                Browsing <strong>{users.length.toLocaleString()}</strong> user profiles. 
                Efficient rendering with virtual scroll.
              </p>
              <VirtualScroll
                items={users}
                height="650px"
                estimatedItemHeight={180}
                gap={16}
                renderItem={(user) => (
                  <div className="bg-linear-to-br from-purple-50 to-white border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-1">
                          {user.name}
                        </h3>
                        <p className="text-sm text-purple-600 mb-2">@{user.username}</p>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">📧</span>
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">📞</span>
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">🌐</span>
                            <span>{user.website}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">🏢</span>
                            <span>{user.company.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                💬 Comments Section - Virtual List
              </h2>
              <p className="text-gray-600 mb-4">
                Reading through <strong>{comments.length.toLocaleString()}</strong> comments. 
                Ultra-smooth scrolling experience.
              </p>
              <VirtualScroll
                items={comments}
                height="650px"
                estimatedItemHeight={110}
                gap={8}
                renderItem={(comment) => (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        {comment.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900">{comment.name}</span>
                          <span className="text-xs text-gray-500">• Post #{comment.postId}</span>
                        </div>
                        <p className="text-xs text-orange-600 mb-2">{comment.email}</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-md">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">⚡ Performance Features:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>✓ Virtual Rendering:</strong> Only ~20 items in DOM at once
            </div>
            <div>
              <strong>✓ Smooth 60fps Scrolling:</strong> Transform-based positioning
            </div>
            <div>
              <strong>✓ Memory Efficient:</strong> Handles thousands of items easily
            </div>
            <div>
              <strong>✓ Real API Data:</strong> JSONPlaceholder public API
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}