import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}){
  const id = params.id
  const body = await req.json()
  const updated = await db.store.update({ where: { id }, data: { name: body?.name, slug: body?.slug, isActive: body?.isActive }})
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string }}){
  const id = params.id
  await db.store.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

