"use client";

import { useDeletePost, usePostsQuery } from "hooks/client/post.hooks";

export function PostsClientSection() {
  const { data: posts = [] } = usePostsQuery();
  const deletePost = useDeletePost();

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        📝 Posts ({posts.length})
      </h2>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.content}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                    post.published
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>

              <button
                onClick={() => {
                  if (confirm("Delete post?")) {
                    deletePost.mutate(post.id);
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
