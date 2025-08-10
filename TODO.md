# TODO (MVP → Producción en Vercel)

## Alta prioridad
- [ ] Configurar variables de entorno en Vercel (NEXTAUTH_SECRET, DATABASE_URL, PUSHER_* y NEXT_PUBLIC_PUSHER_*).
- [ ] Endurecer seguridad:
  - [ ] CSP estricta en next.config (content-security-policy con default-src 'self').
  - [ ] allowedDevOrigins (dev LAN) y revisión de headers existentes.
  - [ ] Rate limit persistente con Redis (Upstash) para /api.
- [ ] CI/CD: GitHub Actions con workflows para lint, test, build, prisma generate.
- [ ] Seeds productivos (crear admin por email controlado via env).
- [ ] E2E estable: usar endpoint test/seed y limpieza de datos.

## Media prioridad
- [ ] UI CRUD completa (Stores, Content, Uploads) con formularios y toasts, edición y archivado.
- [ ] UploadThing: firma, tipos permitidos y errores amigables; tabla de archivos con preview.
- [ ] Realtime: reconexión y manejo de errores; canal por tienda.
- [ ] i18n util y tokens de tema refinados.
- [ ] Métricas admin con agregados en server/services (conteos, últimas actividades).

## Baja prioridad
- [ ] Bundle analyzer y optimizaciones (react-query staleTime, imágenes domains).
- [ ] Documentar endpoints en README con ejemplos curl.
- [ ] Scripts conveniencia: pnpm demo (docker pg + migrate + dev).
