"use client";

import { useSSR } from "components/global/SSRWrapper";
import { PostForm } from "components/pages/examples/forms/post.form";
import { createPostAction, deletePostAction } from "hooks/server/post.action";
import type { Post, User } from "shared/types";

export const PostsServerSection = ({ users, posts }: { users: User[]; posts: Post[] }) => {
  const { isPending, executeAction } = useSSR();

  return (
    <div className="border rounded-lg p-6 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">
        📝 Posts ({posts.length})
      </h2>

      <PostForm
        users={users}
        loading={isPending}
        onSubmit={executeAction(createPostAction)}
      />

      <div className="space-y-3 mt-6 max-h-[600px] overflow-y-auto">
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No posts yet
          </p>
        ) : (
          posts.map((post) => {
            const author = users.find(
              (u) => u.id === post.userId
            );

            return (
              <div
                key={post.id}
                className="p-4 border rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {post.content}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          post.published
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-500 text-white'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>

                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        By: {author?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isPending}
                    onClick={() => {
                      if (!confirm('Delete post?')) return;
                      executeAction(deletePostAction)(post.id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}