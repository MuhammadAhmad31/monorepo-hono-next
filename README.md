# 🚀 Hono + Next.js Monorepo

Full-stack TypeScript monorepo dengan TanStack Query, Table & Virtual Scroll. End-to-end type safety dari backend ke frontend dengan Hono RPC.

## ✨ Features

### 🔥 Hono RPC - Type-safe API dengan Contract Validation

End-to-end type safety dari backend ke frontend dengan automatic contract validation.

**Key Benefits:**
- **🛡️ Type Safety** - Full TypeScript inference dari API ke client tanpa code generation
- **📋 Contract Validation** - Runtime validation untuk semua routes di startup
- **⚡ Zero Overhead** - Lightweight & fast - no extra build steps needed
- **🔧 Single Source of Truth** - Contract adalah dokumentasi yang selalu up-to-date
- **✅ Catch Errors Early** - Contract violations detected at startup, bukan di production

#### How It Works

1. **Define Contract** - Buat contract di `packages/shared/src/contracts/`
2. **Backend Routes** - Routes di-validate saat startup - error jika tidak match contract
3. **Type-safe Client** - Frontend auto dapat types - autocomplete & type checking gratis!

#### Example Usage

**1️⃣ Define Contract (shared)**
```typescript
// packages/shared/src/contracts/users.ts
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
] as const
```

**2️⃣ Backend Routes (validated)**
```typescript
// apps/api/src/routes/users.ts
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
// "PATCH not allowed for /users/:id"
```

**3️⃣ Frontend Usage (type-safe)**
```typescript
// apps/web/src/lib/api.ts
import { createApiClient } from 'shared'
export const api = createApiClient('http://localhost:3001')

// apps/web/src/app/page.tsx
const response = await api.users.getAll()      // ✅ Type: ApiResponse<User[]>
const user = await api.users.create(data)      // ✅ Type-safe input & output
//                          ^? CreateUserInput

// ❌ TypeScript error jika typo atau wrong method:
await api.users.patch(id, data)  // Property 'patch' does not exist
```

---

## 🎯 Rendering Modes

### 🔵 CSR Mode - Client-Side Rendering

Perfect untuk dashboard & interactive applications.

**Features:**
- ✓ **TanStack Query** - useQuery(), useMutation()
- ✓ **Client-Side Fetching** - Data di-fetch di browser
- ✓ **Auto Caching** - Automatic cache management
- ✓ **Realtime Updates** - Perfect untuk dashboard

**Method:**
```typescript
const { data } = useQuery({ queryKey, queryFn })
```

**Best For:**
- Dashboard & Admin Panel
- Protected Pages
- Interactive Applications
- Realtime Data Updates

**Example:** `/example/client`

---

### 🟢 SSR Mode - Server-Side Rendering

Perfect untuk SEO & public content.

**Features:**
- ✓ **Next.js Native** - Server Component async/await
- ✓ **Server Actions** - Generic wrapper reusable
- ✓ **SEO Optimized** - Perfect for search engines
- ✓ **Instant Load** - No loading spinner

**Method:**
```typescript
const data = await api.users.getAll()
```

**Best For:**
- Landing Pages
- Blog & Articles
- E-commerce Product Lists
- Public Content Pages

**Example:** `/example/server`

---

## ⚡ Virtual Scroll Components

High-performance rendering untuk handle ribuan data tanpa lag.

### 📜 Virtual Scroll

List virtualization untuk data linear.

**Features:**
- ✓ Render hanya ~20 items di DOM
- ✓ Smooth 60fps scrolling
- ✓ Handle 10,000+ items

**Use Cases:**
- News feeds
- Comments section
- Chat history
- Activity logs

---

### 🎨 Virtual Grid

Grid layout virtualization multi-kolom.

**Features:**
- ✓ 2-6 columns responsive
- ✓ Row-based virtualization
- ✓ Perfect for media content

**Use Cases:**
- Photo galleries
- Product catalogs
- Card layouts

---

### ♾️ Infinite Scroll

Auto-load more saat scroll ke bawah.

**Features:**
- ✓ Automatic pagination
- ✓ Configurable threshold
- ✓ Works with Virtual Scroll

**Use Cases:**
- Social media feeds
- Search results
- Email inbox

---

## 📊 Performance Comparison

| Metric | Without Virtual Scroll | With Virtual Scroll |
|--------|------------------------|---------------------|
| DOM Nodes | 10,000 | ~20 |
| Memory Usage | ~500MB | ~50MB |
| FPS | 10-20 (laggy) | 60 (smooth) |

---

## 🛠️ Tech Stack

- **Next.js** - React framework with App Router
- **Hono** - Ultra-fast web framework
- **TanStack Query** - Powerful data fetching & caching
- **TanStack Table** - Headless table library
- **TanStack Form** - Type-safe form management
- **TanStack Virtual** - Virtualization for lists & grids
- **Zod** - TypeScript-first schema validation
- **TypeScript** - Type safety across the stack
- **Tailwind CSS** - Utility-first CSS framework

---

## 📂 Project Structure

```
.
├── apps/
│   ├── api/          # Hono backend
│   │   ├── src/
│   │   │   ├── routes/      # API routes (validated)
│   │   │   ├── validators/  # Route validators
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── web/          # Next.js frontend
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # React components
│       │   └── lib/         # Utils & API client
│       └── package.json
│
├── packages/
│   └── shared/       # Shared types & contracts
│       ├── src/
│       │   ├── contracts/   # API contracts
│       │   ├── types/       # Shared types
│       │   └── utils/       # Shared utilities
│       └── package.json
│
└── package.json      # Root package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- bun (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hono-nextjs-monorepo

# Install dependencies
bun install

```

### Development

```bash
# Start both API and Web dev servers
bun dev

# or start individually
bun --filter api dev      # API only (http://localhost:3001)
bun --filter web dev      # Web only (http://localhost:3000)
```

### Build

```bash
# Build all packages
bun build

# or build individually
bun --filter api build
bun --filter web build
```

### Environment Variables

Create `.env` files in respective apps:

**apps/api/.env**
```env
PORT=3001
NODE_ENV=development
```

**apps/web/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📚 Example Pages

Visit these pages after running the dev server:

- **Home** - `/` - Overview & documentation
- **CSR Example** - `/example/client` - Client-side rendering demo
- **SSR Example** - `/example/server` - Server-side rendering demo
- **Virtual Scroll** - `/example/virtual-scroll` - Virtual scroll demos

---

## 🎓 Learn More

### Hono RPC Benefits

- **Refactor with Confidence** - TypeScript error jika API berubah - tidak ada silent breakage
- **Better DX** - Autocomplete & IntelliSense untuk semua API endpoints
- **No Code Generation** - Tidak butuh build step tambahan - pure TypeScript
- **API Documentation** - Contract adalah dokumentasi yang selalu up-to-date

### When to Use CSR vs SSR

**Use CSR when:**
- Need realtime updates
- Building dashboards/admin panels
- User-specific data (protected pages)
- Interactive features with frequent updates

**Use SSR when:**
- SEO is important
- Public content pages
- Initial page load performance matters
- Content doesn't change frequently

### Virtual Scroll Guidelines

**Use Virtual Scroll when:**
- Displaying 100+ items in a list
- Need smooth scrolling performance
- Memory usage is a concern
- Building feeds or long lists

**Don't use when:**
- Less than 50 items
- Need all items in DOM for searching (use browser search)
- Complex item interactions (drag & drop across entire list)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this project for learning or production.

---

## 🙏 Acknowledgments

- [Hono](https://hono.dev) - Ultra-fast web framework
- [Next.js](https://nextjs.org) - The React Framework
- [TanStack](https://tanstack.com) - High-quality open-source software
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue
- Check the documentation
- Explore the example pages

Happy coding! 🎉
