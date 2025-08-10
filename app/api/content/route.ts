import { NextRequest, NextResponse } from 'next/server'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'
import { auth } from '@/server/auth/config'
import { createContent, listContent } from '@/server/services/content'

export async function GET(req: NextRequest){
  const storeId = req.nextUrl.searchParams.get('storeId') || undefined
  const items = await listContent(storeId)
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

