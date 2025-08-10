import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'
import { auth } from '@/server/auth/config'
import { isStoreOwnerOrAdmin } from '@/lib/utils/authz'

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}){
  const id = params.id
  const session = await auth()
  if (!await isStoreOwnerOrAdmin(session?.user, id)) return NextResponse.json({ code: 'FORBIDDEN', message: 'Not allowed' }, { status: 403 })
  const body = await req.json()
  const updated = await db.store.update({ where: { id }, data: { name: body?.name, slug: body?.slug, isActive: body?.isActive }})
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string }}){
  const id = params.id
  const session = await auth()
  if (!await isStoreOwnerOrAdmin(session?.user, id)) return NextResponse.json({ code: 'FORBIDDEN', message: 'Not allowed' }, { status: 403 })
  await db.store.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

