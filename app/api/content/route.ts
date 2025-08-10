import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'
import { contentCreateSchema } from '@/lib/schemas/content'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'

export async function GET(req: NextRequest){
  const storeId = req.nextUrl.searchParams.get('storeId')
  const items = await db.content.findMany({ where: storeId ? { storeId } : {}, orderBy: { createdAt: 'desc' }})
  return NextResponse.json(items)
}

export async function POST(req: NextRequest){
  const body = await req.json()
  const data = contentCreateSchema.parse(body)
  const store = await db.store.findUnique({ where: { id: data.storeId }})
  if(!store) return NextResponse.json({ code: 'NOT_FOUND', message: 'Store not found' }, { status: 404 })
  const created = await db.content.create({ data: { ...data, source: data.source ?? store.slug }})
  await triggerAdmin('content.created', created)
  await triggerStore(created.storeId, 'content.created', created)
  return NextResponse.json(created, { status: 201 })
}

