## Next.js App Router Notes (Complete)

---

# 1️⃣ Project Setup & TypeScript

* `npx create-next-app@latest` → create project
* Choose TypeScript for type safety
* `.tsx` files:

  * **Server Components** → default
  * **Client Components** → `'use client'` at top
* Component naming:

  * First letter **capital** (React convention)
  * File names case-sensitive on some OS

---

# 2️⃣ Client vs Server Components

* **Server Components (default)**

  * Can be async
  * Fetch data on server
  * Faster, no loading flicker
* **Client Components**

  * Use `'use client'`
  * Needed for `useState`, `useEffect`, events
* `console.log()` in server components logs on server

---

# 3️⃣ Data Fetching

* **Server-side fetch** (App Router default)

```ts
const response = await fetch('/api/books', { cache: 'no-store' });
const data = await response.json();
```

* **Cache options**:

  * `force-cache` → static (SSG)
  * `no-store` → always fresh (SSR)
  * `next: { revalidate: 10 }` → cache for 10s (ISR)
* **Partial Prerendering (PPR)**:

  * Static parts render first
  * Async parts stream later
  * Use `<Suspense fallback={<Loading />}>` around dynamic components
  * Best for dashboards, e-commerce, landing pages

---

# 4️⃣ Routing & Dynamic Params

* File-based routing:

  * `app/page.tsx` → `/`
  * `app/about/page.tsx` → `/about`
* Dynamic routes: `[id]` → `/users/1`
* Access dynamic params in server components:

```ts
const { id } = await params; // if async
const idNumber = +context.params.id; // '+' converts string → number
```

* Route groups: organize routes without affecting URLs

---

# 5️⃣ API Routes (App Router)

* Write API routes in **`route.ts`**
* Use **Web Fetch API style**:

```ts
export const GET = async (request: Request) => Response.json(data);
export const POST = async (request: Request) => { const body = await request.json(); ... }
```

* **Dynamic route API** `[id]/route.ts`:

```ts
export const PUT = async (request: Request, context: { params: { id: string } }) => { ... }
```

* `Request` = incoming request
* `Response` = return response
* Node/Express style `req`, `res` **no longer used** in App Router

### CRUD Example

* GET → `/api/books`

* POST → `/api/books`

* PUT → `/api/books/[id]`

* DELETE → `/api/books/[id]`

* `+context.params.id` → converts string to number

---

# 6️⃣ Build & Runtime Adapters

* **Build Adapters**:

  * Convert Next.js app for deployment environment
  * Example: Vercel Edge, Node.js server, Netlify
* **API Adapters**:

  * Transform `route.ts` into compatible serverless or edge functions
* Next.js automatically handles this → write Fetch API style, deploy anywhere

---

# 7️⃣ Metadata & SEO

* **Metadata** = `<title>`, `<meta>`, Open Graph, Twitter, canonical URL
* **Static metadata**:

```ts
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our team',
}
```

* **Dynamic metadata**:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetch(...).then(r => r.json());
  return { title: post.title, description: post.summary };
}
```

* Automatically injected into `<head>`

* Best practices:

  * Unique titles & descriptions per page
  * Open Graph / Twitter for social previews
  * Use canonical URLs

* **Where meta tags appear**:

  * Inside `<head>`
  * Browsers and search engines read it
  * Next.js App Router injects automatically → no manual `<Head>` required

---

# 8️⃣ Suspense & Partial Prerendering

* `<Suspense>` shows fallback **only for dynamic parts at runtime**
* Pure SSG → fallback **never appears**
* PPR example:

```tsx
<Suspense fallback={<p>Loading...</p>}>
  <Books />
</Suspense>
```

* Static parts load immediately, dynamic parts stream later
* Improves **perceived page speed**

---

# 9️⃣ Cache & Cache Life

* `cache: 'force-cache'` → fully static (SSG)
* `cache: 'no-store'` → always fresh (SSR)
* `next: { revalidate: 10 }` → incremental static regeneration, cache life 10s
* Partial Prerendering can combine **static shell + dynamic islands**
* Use `revalidate` for pages like product lists or dashboards to balance speed + freshness

---

# 10️⃣ Notes on TypeScript + Component Naming

* Always capitalize component names
* `.tsx` files for components with JSX
* Types for fetched data:

```ts
type Book = { id: number; name: string };
const books: Book[] = await response.json();
```

* Helps with autocomplete and catching mistakes

---

# 11️⃣ Key Takeaways

1. Server Components = default, can be async
2. Client Components = `'use client'`, needed for state/effects
3. Data fetching on server = `fetch`, `Request`, `Response`
4. Partial Prerendering = static + dynamic streaming
5. API routes = Fetch API style, universal
6. Build adapters = package app for deployment platform
7. Metadata = SEO + social sharing, use `metadata` or `generateMetadata`
8. Suspense fallback only for runtime async
9. Cache strategies: force-cache / no-store / revalidate
10. TS types = safer code, component naming = capitalize first letter

---

# ✅ Recommended Best Practices

* Always use SSG for static content, ISR for semi-dynamic, SSR/no-store for fully dynamic
* Use metadata per page for SEO
* Use `<Suspense>` for dynamic Server Components
* Use relative URLs for API fetch inside same app (`/api/...`)
* Handle errors & loading states
* Keep dynamic routes `[id]` and params type-safe with `+` or `Number()` conversion

---

**End of Notes**
