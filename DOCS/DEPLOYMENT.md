# Despliegue en Vercel

## Prerrequisitos
- Base de datos PostgreSQL gestionada (Neon/Render/Railway). Obtén `DATABASE_URL`.
- Proyecto conectado a Vercel (GitHub).
- Secrets en Vercel: `DATABASE_URL`, `NEXTAUTH_SECRET`, `PUSHER_*`, `NEXT_PUBLIC_PUSHER_*`.

## Pasos
1. Configura variables en Vercel → Settings → Environment Variables.
2. En GitHub, activa workflows (CI/CD) y da permisos a Vercel Token si usas acción.
3. En primer despliegue de prod, ejecuta `prisma migrate deploy` (workflow lo hace).
4. Verifica `/health` y flujo de login.

## Rollback
- Revertir commit y redeploy en Vercel.
- Si la migración rompió prod: usa backups de tu proveedor o `prisma migrate resolve`.
