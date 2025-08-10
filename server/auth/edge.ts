import NextAuth from 'next-auth'

// Edge-safe auth helper for middleware: no adapter/providers, JWT-only
export const { auth } = NextAuth({
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  callbacks: {
    // Shape the session so middleware can read role and user id
    session: async ({ session, token }) => {
      ;(session as any).role = (token as any).role
      ;(session as any).user = { ...(session as any).user, id: (token as any).sub }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
})


