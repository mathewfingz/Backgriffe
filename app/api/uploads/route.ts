import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'

export const runtime = 'nodejs'
export async function GET(req: NextRequest){
  const storeId = req.nextUrl.searchParams.get('storeId')
  if(!storeId) return NextResponse.json({ code: 'VAL_UPLOADS', message: 'storeId required' }, { status: 400 })
  const items = await db.upload.findMany({ where: { storeId }, orderBy: { createdAt: 'desc' }})
  return NextResponse.json(items)
}

// Placeholder for UploadThing integration (sign/upload)
export async function POST(req: NextRequest){
  const body = await req.json()
  const { storeId, fileKey, url, mime, size } = body || {}
  if(!storeId || !fileKey || !url || !mime || typeof size !== 'number'){
    return NextResponse.json({ code: 'VAL_UPLOADS', message: 'Invalid payload' }, { status: 400 })
  }
  const created = await db.upload.create({ data: { storeId, fileKey, url, mime, size }})
  await triggerAdmin('upload.created', created)
  await triggerStore(storeId, 'upload.created', created)
  return NextResponse.json(created, { status: 201 })
}

