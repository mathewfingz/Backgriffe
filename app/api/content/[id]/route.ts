import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'
import { auth } from '@/server/auth/config'
import { isStoreOwnerOrAdmin } from '@/lib/utils/authz'
import { contentUpdateSchema } from '@/lib/schemas/content'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}){
  const id = params.id
  const body = await req.json()
  const data = contentUpdateSchema.parse(body)
  const existing = await db.content.findUnique({ where: { id }, select: { storeId: true } })
  if (!existing) return NextResponse.json({ code: 'NOT_FOUND', message: 'Content not found' }, { status: 404 })
  const session = await auth()
  if (!await isStoreOwnerOrAdmin(session?.user, existing.storeId)) return NextResponse.json({ code: 'FORBIDDEN', message: 'Not allowed' }, { status: 403 })
  const updated = await db.content.update({ where: { id }, data })
  await triggerAdmin('content.updated', updated)
  await triggerStore(updated.storeId, 'content.updated', updated)
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string }}){
  const id = params.id
  const existing = await db.content.findUnique({ where: { id }, select: { storeId: true } })
  if (!existing) return NextResponse.json({ code: 'NOT_FOUND', message: 'Content not found' }, { status: 404 })
  const session = await auth()
  if (!await isStoreOwnerOrAdmin(session?.user, existing.storeId)) return NextResponse.json({ code: 'FORBIDDEN', message: 'Not allowed' }, { status: 403 })
  const deleted = await db.content.delete({ where: { id } })
  await triggerAdmin('content.deleted', deleted)
  await triggerStore(deleted.storeId, 'content.deleted', deleted)
  return NextResponse.json({ ok: true })
}

