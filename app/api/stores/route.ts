import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'

export async function GET(){
  const items = await db.store.findMany({ orderBy: { createdAt: 'desc' }})
  return NextResponse.json(items)
}

export async function POST(req: NextRequest){
  const body = await req.json()
  // Minimal validation; expanded Zod schemas would live in lib/schemas/store.ts
  if (!body?.name || !body?.slug || !body?.ownerId) return NextResponse.json({ code: 'VAL_STORE', message: 'Missing fields' }, { status: 400 })
  const created = await db.store.create({ data: { name: body.name, slug: body.slug, ownerId: body.ownerId }})
  return NextResponse.json(created, { status: 201 })
}

