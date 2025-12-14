"use client";

import { PostsClientSection, UsersClientSection } from "components/pages";


export default function CSRPage() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          🔵 CSR Mode - TanStack Query
        </h1>
        <p>lihat server side <a href="/example/server">di sini</a></p>
        <p className="text-gray-600">
          Data di-fetch sepenuhnya di CLIENT SIDE (browser)
        </p>
        <p className="text-sm text-blue-600 mt-1">
          ✓ Pakai TanStack Query hooks
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <UsersClientSection />
        <PostsClientSection />
      </div>
    </main>
  );
}
