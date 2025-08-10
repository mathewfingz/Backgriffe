import { NextRequest, NextResponse } from 'next/server'
import { listStores, createStore } from '@/server/services/stores'
import { auth } from '@/server/auth/config'
import { isAdmin } from '@/lib/utils/authz'
import { rateLimit } from '@/lib/utils/rateLimit'

export const runtime = 'nodejs'
export async function GET(req: NextRequest){
  if (!rateLimit(req)) return NextResponse.json({ code: 'RATE_LIMITED', message: 'Too many requests' }, { status: 429 })
  const items = await listStores()
  return NextResponse.json(items)
}

export async function POST(req: NextRequest){
  const session = await auth()
  if (!await isAdmin(session?.user)) return NextResponse.json({ code: 'FORBIDDEN', message: 'Admins only' }, { status: 403 })
  try {
    const body = await req.json()
    const created = await createStore(body)
    return NextResponse.json(created, { status: 201 })
  } catch (err: any){
    const status = err?.code === 'NOT_FOUND' ? 404 : 400
    return NextResponse.json({ code: err?.code ?? 'VAL_STORE', message: err?.message ?? 'Invalid payload' }, { status })
  }
}

