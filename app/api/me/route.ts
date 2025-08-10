import { NextResponse } from 'next/server'
import { auth } from '@/server/auth/config'

export async function GET(){
  const session = await auth()
  if(!session?.user) return NextResponse.json({ ok: false }, { status: 401 })
  const user = session.user as any
  return NextResponse.json({ id: user.id ?? user.sub, email: user.email, role: (session as any).role })
}

