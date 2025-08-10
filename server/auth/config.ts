import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/server/db/client'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as any,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: { email: { label: 'email' }, password: { label: 'password' } },
      authorize: async (creds) => {
        const email = (creds as any)?.email as string | undefined
        const password = (creds as any)?.password as string | undefined
        if(!email || !password) return null
        const user = await db.user.findUnique({ where: { email } })
        if (!user || !user.password) return null
        const { verify } = await import('argon2')
        const ok = await verify(user.password, password)
        return ok ? { id: user.id, email: user.email, role: user.role } as any : null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => { if (user) (token as any).role = (user as any).role; return token },
    session: async ({ session, token }) => { (session as any).role = (token as any).role; (session as any).user = { ...(session as any).user, id: (token as any).sub }; return session },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const role = (auth as any)?.user?.role
      const isAdmin = nextUrl.pathname.startsWith('/admin')
      const isStore = nextUrl.pathname.startsWith('/stores')
      if (isAdmin) return role === 'ADMIN'
      if (isStore) return !!role
      return true
    },
    signIn: async () => true,
    redirect: async ({ baseUrl, url }) => url.startsWith('/') ? `${baseUrl}${url}` : url
  },
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET
})

export const { GET, POST } = handlers

