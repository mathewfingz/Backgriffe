# Backgriffe Audit

## 1) Resumen técnico
- Runtime: Node.js 20+ (dev usa pnpm y Next.js 14). TypeScript estricto.
- Framework: Next.js 14 (App Router). SSR/ISR y Route Handlers.
- ORM: Prisma 5 (PostgreSQL 15).
- Auth: Auth.js v5 (NextAuth beta) con Credentials + JWT.
- Realtime: Pusher (server) + pusher-js (client) con fallback local BroadcastChannel.
- UI: React 18, TailwindCSS 3, componentes propios estilo shadcn.
- Validación: Zod.
- Estado/datos: TanStack Query 5 + Zustand (UI local).
- Subidas: UploadThing 6.
- Tests: Vitest (unit), Playwright (e2e).

### Scripts package.json
- **dev**: arranca servidor de desarrollo (Next)
- **build**: `prisma generate && next build` (build de producción)
- **start**: `next start` (sirve el build)
- **lint**: `eslint .`
- **test / test:watch**: Vitest
- **test:e2e**: Playwright
- **db:migrate / db:deploy / db:reset**: migraciones Prisma
- **seed**: `ts-node prisma/seed.ts` (siembra admin)

### Estructura
- `app/`: App Router (páginas y API)
- `server/`: db client, auth config, realtime, servicios dominio
- `lib/`: hooks, schemas Zod, utils, keys, realtime fallback
- `prisma/`: `schema.prisma`, `seed.ts`
- `components/`: comunes, admin, store
- `styles/`: `globals.css`, `themes.css`
- `tests/`: unit (Vitest), e2e (Playwright)
- `next.config.mjs`, `tailwind.config.ts`

## 2) Variables de entorno
Usadas y dónde:
- `DATABASE_URL`: `prisma/schema.prisma` (datasource)
- `NEXTAUTH_URL`: base de callbacks Auth.js
- `NEXTAUTH_SECRET`: `server/auth/config.ts` (secret)
- `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`: `server/realtime/pusher.ts`
- `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`: `lib/hooks/useRealtime.ts` (cliente)
- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`: `prisma/seed.ts`

Riesgos/faltantes:
- `NEXTAUTH_SECRET` obligatorio en todos los entornos.
- Claves Pusher sólo en entorno, nunca en código.
- Variables `NEXT_PUBLIC_*` son públicas (no secretos).

## 3) Puntos de entrada
- Next.js no usa `app.listen`; entry manejado por Next. Las APIs son serverless-ready (export GET/POST en rutas).

## 4) Dependencias
Runtime: next 14, react 18, react-dom 18, @prisma/client 5, next-auth 5 beta, @auth/prisma-adapter, argon2, zod, @tanstack/react-query 5, zustand 4, tailwind-merge, clsx, pusher, pusher-js, uploadthing, @uploadthing/react, @uploadthing/shared, lucide-react, pushid.
Dev: prisma 5, typescript 5, eslint 9, eslint-config-next 14, prettier 3, vitest 1, @vitest/coverage-v8, playwright 1, @playwright/test, postcss, tailwindcss 3, autoprefixer, ts-node, @types/*, happy-dom.

Observaciones:
- `next-auth@5.0.0-beta.29` es beta. Alternativa: v4 estable o mantener v5 con testeo.
- Prisma 5.x OK; revisar changelogs para upgrades mayores.

Sugerencias:
- CSP más estricta y `allowedDevOrigins` en `next.config.mjs`.
- Rate limiting persistente con Redis para `/api/*`.
- Logging http (pino-http/morgan) si se requiere observabilidad.
- Mantener Zod `.strict()` y sanitización de HTML cuando aplique.

## 5) Conclusión
Arquitectura moderna, serverless-ready, con Auth, Prisma y Realtime. Priorizar seguridad, CI/CD y pulido de UI/CRUD para producción.
