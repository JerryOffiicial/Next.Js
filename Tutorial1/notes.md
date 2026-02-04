# Next.js – Complete Notes (From Scratch)

These are **core concepts and workflows** you must remember while learning and using Next.js (App Router). Use this as a **revision sheet** and full reference.

---

## 1. What Next.js Is

* Next.js is a **React framework**
* Adds features React alone doesn’t give:

  * Server-Side Rendering (SSR)
  * Static Site Generation (SSG)
  * File-based routing
  * API routes
  * Better performance & SEO

> Think of Next.js as **React + server power**

---

## 2. App Router Basics

* Uses the `app/` folder (not `src/pages`)
* Routing is **folder-based**
* **A route exists only if the folder has a `page.tsx` file**

```txt
app/
 ├─ page.tsx        → /
 ├─ blog/
 │   └─ page.tsx    → /blog
 └─ layout.tsx      → shared layout
```

### Important: Page Access

* Folder without `page.tsx` → **not accessible**
* Folder with only `layout.tsx` → **children pages work, parent route does not**

---

## 3. Server Components (DEFAULT)

* Every component is a **Server Component by default**
* Runs on the **server**, not the browser

### Rules

* ❌ No `useState`, `useEffect`, `useReducer`
* ❌ No `onClick`, `onChange`
* ❌ No `window`, `document`
* ✅ Can fetch data directly
* ✅ Can access databases & secrets
* ✅ Better performance & SEO

```tsx
export default function Page() {
  return <h1>Hello from Server</h1>;
}
```

> Server Components return **HTML only**

---

## 4. Client Components

* Needed for **interaction**
* Must include:

```tsx
"use client";
```

### When to use Client Components

* Forms, Buttons, Modals
* useState, useReducer, useContext
* Hooks (useEffect, useLayoutEffect)
* Browser APIs (window, document)

```tsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 5. SSR vs CSR (Core Concept)

### Server-Side Rendering (SSR)

* HTML created on the **server**
* Fast first load
* SEO friendly
* No direct interaction until hydration

### Client-Side Rendering (CSR)

* HTML created in the **browser**
* Interactive immediately
* Slower first load
* Poor SEO if content relies on CSR only

> Next.js = **SSR by default, CSR only when needed**

---

## 6. Hydration (VERY IMPORTANT)

* React **attaches event listeners** to server-rendered HTML
* Happens only for **Client Components**
* Without hydration → page is read-only

Steps:

1. Server sends HTML
2. Browser shows page
3. JS loads
4. Events become active

---

## 7. Mixing Server & Client Components

✅ Recommended pattern

```tsx
// Server Component
import Button from "./Button";

export default async function Page() {
  const data = await getData();
  return (
    <>
      <h1>{data.title}</h1>
      <Button />
    </>
  );
}
```

```tsx
// Button.tsx
"use client";
export default function Button() {
  return <button>Click</button>;
}
```

> Server = data & SEO
> Client = interaction

---

## 8. Data Fetching in App Router

### Server Fetching (Recommended)

```tsx
const res = await fetch(url, { cache: "no-store" });
```

* Runs on server
* No loading state needed
* Secure

---

## 9. Rendering Types

### Static Rendering (SSG)

* Built at **build time**
* Very fast
* Best for blogs & landing pages

```tsx
export const dynamic = "force-static";
```

### Dynamic Rendering (SSR)

* Built on **every request**
* Best for auth & user data

```tsx
export const dynamic = "force-dynamic";
```

---

## 10. Layouts

* `layout.tsx` wraps pages
* Preserves UI between routes

```tsx
export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

---

## 11. Metadata & SEO

```tsx
export const metadata = {
  title: "Home",
  description: "My site"
};
```

* Runs on server
* Improves SEO

---

## 12. API Routes

```txt
app/api/users/route.ts
```

```ts
export async function GET() {
  return Response.json({ users: [] });
}
```

* Runs on server (serverless functions)
* Can safely access secrets and DB

### Custom Backend (Optional)

* You can also use **separate Node/Express server**
* Next.js API routes + external backend can **coexist** without conflicts
* Just don’t try to run Express inside Next.js App Router manually

---

## 13. Environment Variables

* Server only:

```env
DATABASE_URL=secret
```

* Client exposed:

```env
NEXT_PUBLIC_API_URL=...
```

---

## 14. VS Code Tips (Project Navigation)

| Task                   | Shortcut                   |
| ---------------------- | -------------------------- |
| Search across project  | Ctrl+Shift+F / Cmd+Shift+F |
| Open file fast         | Ctrl+P / Cmd+P             |
| Search in current file | Ctrl+F / Cmd+F             |
| Go to function         | Ctrl+Shift+O               |

---

## 15. Golden Rules (MEMORIZE)

* Server Components by default
* Use Client Components only when needed
* No browser logic on server
* No secrets on client
* Fetch data on server whenever possible
* `"use client"` allows interactivity / CSR
* SSR runs automatically on **Next.js server** or serverless environment

---

## 16. Mental Model 🧠

```
Browser
   │
   │ request /
   ▼
Next.js Server (auto-created)
   │
   │ runs Server Components / API routes
   │ fetches data
   │ builds HTML
   ▼
HTML response
   │
   ▼
Browser shows page + Client Components hydrate
```

> Next.js = backend + frontend framework that hides server setup
> Server Components = SSR, Client Components = CSR + interactivity

---

## 17. Quick Interview One-Liners

* “Routes exist only if folder has `page.tsx`.”
* “Server Components = default, run on server, cannot use hooks or browser APIs.”
* “`use client` = mark component as Client Component (CSR).”
* “Next.js automatically provides a server for SSR and API routes.”
* “SSR + Client Components coexist via hydration.”
* “API routes + external backend can exist together without conflicts.”

---

# Next.js – Data Fetching & Rendering Notes

This section focuses on **data fetching, caching, static, and dynamic rendering** in Next.js App Router.

---

## 1. Data Fetching in Server Components

* Server Components can be **async**
* Can fetch data directly with `fetch()` or from a database
* Runs on the **server**, safe for secrets and server-side APIs

```ts
const res = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await res.json();
```

✅ No `useEffect` needed for server-side fetching

---

## 2. Rendering Types in Next.js

| Rendering Type                            | Description                                                       | Next.js Example                                                   |
| ----------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| **SSR (Server-Side Rendering)**           | Runs on every request, HTML is generated per request              | Default Server Component, `async` fetch with no caching overrides |
| **SSG (Static Site Generation)**          | HTML generated **at build time**, same for all users              | `fetch(..., { cache: 'force-cache' })`                            |
| **ISR (Incremental Static Regeneration)** | Static generation + background updates after `revalidate` seconds | `fetch(..., { next: { revalidate: 10 } })`                        |
| **CSR (Client-Side Rendering)**           | HTML generated in browser, for interactive components             | `"use client"` + hooks + fetch in `useEffect`                     |

---

## 3. Static Site Generation (SSG)

* Generated at **build time**
* HTML served to all users until next build
* Fastest first load and SEO-friendly

```ts
const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' })
```

✅ Best for blogs, landing pages, docs

---

## 4. Incremental Static Regeneration (ISR)

* Starts as SSG, but can **update automatically after a set interval**
* Use `{ next: { revalidate: X } }`
* First request after X seconds triggers **background regeneration**
* Users still see cached page until regeneration completes

```ts
const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 10 } })
```

✅ Best for product pages, stats, dashboards

---

## 5. SSR (Server-Side Rendering) with cache control

* HTML generated **on every request**
* Use `{ cache: 'no-store' }` to **force fresh SSR every time**

```ts
const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' })
```

✅ Good for auth pages, user-specific data

---

## 6. Client-Side Rendering (CSR)

* HTML generated in **browser**, not on server
* Requires `"use client"`
* Can use hooks like `useState`, `useEffect`
* Interactive UI and event handling happen on client

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

✅ Best for dashboards, forms, interactive components

---

## 7. Key Points / Rules

1. **Server Components** = default → SSR by default
2. **Client Components** = `"use client"` → CSR + interactivity
3. **SSG** = `cache: 'force-cache'` → built at build time
4. **ISR** = `next: { revalidate: X }` → static + revalidation
5. **SSR always fresh** = `cache: 'no-store'`
6. **Server Components can fetch secrets and DBs safely**
7. **Client Components fetch in browser**, cannot access server-only secrets

---

## 8. Quick Visual Memory Trick

```
Server Component + fetch() 
  ├─ cache: 'force-cache' → SSG
  ├─ next: { revalidate: X } → ISR
  ├─ cache: 'no-store' → SSR every request
Client Component ("use client") + useEffect + fetch() → CSR
```

> SSG = frozen at build 🏗️
> ISR = frozen but refreshes ⏰
> SSR = fresh every request 🔄
> CSR = dynamic in browser 💻

---

End of Data Fetching & Rendering Notes ✅

End of notes ✅


