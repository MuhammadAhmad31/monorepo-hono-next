import { SSRWrapper } from "components/global";
import { PostsServerSection, UsersServerSection } from "components/pages";
import { getAllPostsAction, getUserAllAction } from "hooks/server";


export default async function ServerPage() {
  const [usersResponse, postsResponse] = await Promise.all([
    getUserAllAction(),
    getAllPostsAction(),
  ]);

  const users = usersResponse.success ? usersResponse.data ?? [] : [];

  const posts = postsResponse.success ? postsResponse.data ?? [] : [];

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🟢 SSR Mode</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Server-Side Rendering - No ClientPage needed!
        </p>
      </div>
      <p>lihar client side <a href="/example/client">di sini</a></p>

      <SSRWrapper>
        <div className="grid md:grid-cols-2 gap-8">
          <UsersServerSection users={users} />
          <PostsServerSection users={users} posts={posts} />
        </div>
      </SSRWrapper>
    </main>
  );
}
