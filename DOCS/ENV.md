# Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| DATABASE_URL | Cadena de conexión Postgres (usar sslmode=require si aplica) | postgresql://user:pass@host:5432/db?sslmode=require |
| NEXTAUTH_URL | URL base para callbacks Auth.js | http://localhost:3010 |
| NEXTAUTH_SECRET | Secreto para firmar JWT/CSRF | cambialo-por-uno-fuerte |
| PUSHER_APP_ID | Pusher App ID (server) | 123456 |
| PUSHER_KEY | Pusher Key (server) | pk_xxx |
| PUSHER_SECRET | Pusher Secret (server) | sk_xxx |
| PUSHER_CLUSTER | Pusher cluster | us2 |
| NEXT_PUBLIC_PUSHER_KEY | Pusher Key (cliente) | pk_xxx |
| NEXT_PUBLIC_PUSHER_CLUSTER | Cluster (cliente) | us2 |
| SEED_ADMIN_EMAIL | Email admin inicial | admin@example.com |
| SEED_ADMIN_PASSWORD | Password admin inicial | admin123 |
| ALLOWED_DEV_ORIGINS | (Dev) orígenes dev permitidos (coma) | http://localhost:3010,http://192.168.1.4:3010 |
