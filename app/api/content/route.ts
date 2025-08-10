import { NextRequest, NextResponse } from 'next/server'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'
import { auth } from '@/server/auth/config'
import { createContent, listContent } from '@/server/services/content'
import { isStoreOwnerOrAdmin } from '@/lib/utils/authz'

export const runtime = 'nodejs'
export async function GET(req: NextRequest){
  const session = await auth()
  const storeId = req.nextUrl.searchParams.get('storeId') || undefined
  if (storeId){
    const allowed = await isStoreOwnerOrAdmin(session?.user, storeId)
    if(!allowed) return NextResponse.json({ code: 'FORBIDDEN', message: 'Not allowed' }, { status: 403 })
    const items = await listContent(storeId)
    return NextResponse.json(items)
  }
  // Global content list only for admins
  if ((session as any)?.user?.role !== 'ADMIN') return NextResponse.json({ code: 'FORBIDDEN', message: 'Admins only' }, { status: 403 })
  const items = await listContent(undefined)
  return NextResponse.json(items)
}

export async function POST(req: NextRequest){
  const session = await auth()
  const userId = (session as any)?.user?.id ?? (session as any)?.user?.sub
  if(!userId) return NextResponse.json({ code: 'UNAUTHORIZED', message: 'Not authenticated' }, { status: 401 })
  try {
    const body = await req.json()
    const created = await createContent(body, String(userId))
    await triggerAdmin('content.created', created)
    await triggerStore(created.storeId, 'content.created', created)
    return NextResponse.json(created, { status: 201 })
  } catch (err: any){
    const status = err?.code === 'NOT_FOUND' ? 404 : 400
    return NextResponse.json({ code: err?.code ?? 'VAL_CONTENT', message: err?.message ?? 'Invalid payload' }, { status })
  }
}

