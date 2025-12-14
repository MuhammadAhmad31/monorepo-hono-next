import Link from 'next/link';

export default function HomePage() {
  
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            🚀 Hono + Next.js Monorepo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Full-stack TypeScript with TanStack Query, Table & Virtual Scroll
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Pilih rendering mode & teknologi yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Hono RPC Section - NEW */}
        <div className="mb-12">
          <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-xl shadow-2xl p-8 text-white mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white text-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
                🔥
              </div>
              <div>
                <h2 className="text-4xl font-bold">Hono RPC</h2>
                <p className="text-orange-100">Type-safe API dengan Contract Validation</p>
              </div>
            </div>
            
            <p className="text-lg mb-6 text-orange-50">
              End-to-end type safety dari backend ke frontend dengan automatic contract validation
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <h3 className="font-bold mb-2">Type Safety</h3>
                <p className="text-sm text-orange-50">
                  Full TypeScript inference dari API ke client tanpa code generation
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-bold mb-2">Contract Validation</h3>
                <p className="text-sm text-orange-50">
                  Runtime validation untuk semua routes di startup
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-bold mb-2">Zero Overhead</h3>
                <p className="text-sm text-orange-50">
                  Lightweight & fast - no extra build steps needed
                </p>
              </div>
            </div>
          </div>

          {/* Hono RPC Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* How it Works */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                🔧 How It Works
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Define Contract</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Buat contract di <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">packages/shared/src/contracts/</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Backend Routes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Routes di-validate saat startup - error jika tidak match contract
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Type-safe Client</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Frontend auto dapat types - autocomplete & type checking gratis!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                ✨ Benefits
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Catch Errors Early</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Contract violations detected at startup, bukan di production
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Refactor with Confidence</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      TypeScript error jika API berubah - tidak ada silent breakage
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Better DX</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Autocomplete & IntelliSense untuk semua API endpoints
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Single Source of Truth</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Contract adalah dokumentasi yang selalu up-to-date
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold text-sm">No Code Generation</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Tidak butuh build step tambahan - pure TypeScript
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-400 text-xl">🔥</span>
              <h3 className="text-white font-semibold">Hono RPC Example</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">1️⃣ Define Contract (shared)</p>
                <pre className="text-xs text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto">
{`// packages/shared/src/contracts/users.ts
export const usersContracts = [
  defineRouteContract({
    path: '/users' as const,
    methods: ['GET', 'POST'] as const,
    bodies: {
      POST: undefined as any as CreateUserInput,
    }
  }),
  defineRouteContract({
    path: '/users/:id' as const,
    methods: ['GET', 'PUT', 'DELETE'] as const,
  }),
] as const`}
                </pre>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">2️⃣ Backend Routes (validated)</p>
                <pre className="text-xs text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto">
{`// apps/api/src/routes/users.ts
const userRoutes = new Hono()
const validator = createValidatedRoutes()
const route = validator.wrap(userRoutes, '/users')

route.get('/', (c) => getAllUsers(c))
route.post('/', 
  zValidator('json', createUserSchema),
  (c) => createUser(c)
)

// ❌ This will ERROR at startup:
// route.patch('/:id', ...) 
// "PATCH not allowed for /users/:id"`}
                </pre>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">3️⃣ Frontend Usage (type-safe)</p>
              <pre className="text-xs text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto">
{`// apps/web/src/lib/api.ts
import { createApiClient } from 'shared'
export const api = createApiClient('http://localhost:3001')

// apps/web/src/app/page.tsx
const response = await api.users.getAll()      // ✅ Type: ApiResponse<User[]>
const user = await api.users.create(data)      // ✅ Type-safe input & output
//                          ^? CreateUserInput

// ❌ TypeScript error jika typo atau wrong method:
await api.users.patch(id, data)  // Property 'patch' does not exist`}
              </pre>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Rendering Modes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* CSR Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 border-blue-200 dark:border-blue-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                🔵
              </div>
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">CSR Mode</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
              Client-Side Rendering
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>TanStack Query</strong> - useQuery(), useMutation()
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Client-Side Fetching</strong> - Data di-fetch di browser
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Auto Caching</strong> - Automatic cache management
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Realtime Updates</strong> - Perfect untuk dashboard
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                📦 Method:
              </p>
              <code className="text-sm text-blue-600 dark:text-blue-400 block mb-3">
                const {'{'} data {'}'} = useQuery({'{'}queryKey, queryFn{'}'})
              </code>
              
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                🎯 Best For:
              </p>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Dashboard & Admin Panel</li>
                <li>• Protected Pages</li>
                <li>• Interactive Applications</li>
                <li>• Realtime Data Updates</li>
              </ul>
            </div>

            <Link 
              href="/example/client"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Lihat Contoh CSR →
            </Link>
          </div>

          {/* SSR Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 border-green-200 dark:border-green-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                🟢
              </div>
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">SSR Mode</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
              Server-Side Rendering
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Next.js Native</strong> - Server Component async/await
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Server Actions</strong> - Generic wrapper reusable
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>SEO Optimized</strong> - Perfect for search engines
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Instant Load</strong> - No loading spinner
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                📦 Method:
              </p>
              <code className="text-sm text-green-600 dark:text-green-400 block mb-3">
                const data = await api.users.getAll()
              </code>
              
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                🎯 Best For:
              </p>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Landing Pages</li>
                <li>• Blog & Articles</li>
                <li>• E-commerce Product Lists</li>
                <li>• Public Content Pages</li>
              </ul>
            </div>

            <Link 
              href="/example/server"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Lihat Contoh SSR →
            </Link>
          </div>
        </div>

        {/* Virtual Scroll Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ⚡ Virtual Scroll Components
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              High-performance rendering untuk handle ribuan data tanpa lag
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Virtual Scroll Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-purple-200 dark:border-purple-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center mb-4">
                <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  📜
                </div>
                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Virtual Scroll
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                List virtualization untuk data linear
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Render hanya ~20 items di DOM
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Smooth 60fps scrolling
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Handle 10,000+ items
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                  🎯 Use Cases:
                </p>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• News feeds</li>
                  <li>• Comments section</li>
                  <li>• Chat history</li>
                  <li>• Activity logs</li>
                </ul>
              </div>

              <Link 
                href="/example/virtual-scroll"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                Lihat Demo →
              </Link>
            </div>

            {/* Virtual Grid Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-pink-200 dark:border-pink-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center mb-4">
                <div className="bg-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  🎨
                </div>
                <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  Virtual Grid
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                Grid layout virtualization multi-kolom
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    2-6 columns responsive
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Row-based virtualization
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Perfect for media content
                  </p>
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                  🎯 Use Cases:
                </p>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Photo galleries</li>
                  <li>• Product catalogs</li>
                  <li>• Card layouts</li>
                </ul>
              </div>

              <Link 
                href="/example/virtual-scroll"
                className="block w-full bg-pink-500 hover:bg-pink-600 text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                Lihat Demo →
              </Link>
            </div>

            {/* Infinite Scroll Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-indigo-200 dark:border-indigo-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center mb-4">
                <div className="bg-indigo-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  ♾️
                </div>
                <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Infinite Scroll
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                Auto-load more saat scroll ke bawah
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Automatic pagination
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold text-sm">✓</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Configurable threshold
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mb-2">
                  🎯 Use Cases:
                </p>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Social media feeds</li>
                  <li>• Search results</li>
                  <li>• Email inbox</li>
                </ul>
              </div>

              <Link 
                href="/example/virtual-scroll"
                className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                Lihat Demo →
              </Link>
            </div>
          </div>

          {/* Performance Comparison */}
          <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-purple-200 dark:border-purple-900">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              ⚡ Performance Comparison
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-100 dark:bg-red-900 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Without Virtual Scroll</h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Render 10,000 DOM nodes</li>
                  <li>• Memory: ~500MB</li>
                  <li>• FPS: 10-20 (laggy)</li>
                </ul>
              </div>
              <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ With Virtual Scroll</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Render only ~20 DOM nodes</li>
                  <li>• Memory: ~50MB</li>
                  <li>• FPS: 60 (smooth)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🛠️ Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold">
              Next.js
            </span>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full font-semibold">
              Hono
            </span>
            <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full font-semibold">
              TanStack Query
            </span>
            <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-4 py-2 rounded-full font-semibold">
              TanStack Table
            </span>
            <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-4 py-2 rounded-full font-semibold">
              TanStack Form
            </span>
            <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-4 py-2 rounded-full font-semibold">
              TanStack Virtual
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full font-semibold">
              Zod
            </span>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full font-semibold">
              TypeScript
            </span>
            <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}