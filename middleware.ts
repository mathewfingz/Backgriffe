import { auth } from '@/server/auth/edge'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const role = (req as any).auth?.user?.role
  if (nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN'){
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
  return NextResponse.next()
})

export const config = { matcher: ['/admin/:path*', '/stores/:path*'] }

