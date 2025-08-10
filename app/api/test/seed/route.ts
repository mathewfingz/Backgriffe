import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'
import { randomUUID } from 'crypto'
import { auth } from '@/server/auth/config'

// Test-only endpoint: creates a store for the current user (admin) and returns IDs
export async function POST(req: NextRequest){
  const session = await auth()
  if ((session as any)?.role !== 'ADMIN') return NextResponse.json({ code: 'FORBIDDEN' }, { status: 403 })
  const adminId = (session as any)?.user?.id ?? (session as any)?.user?.sub
  const slug = `test-${randomUUID().slice(0,8)}`
  const store = await db.store.create({ data: { name: `Test ${slug}`, slug, ownerId: String(adminId) }})
  return NextResponse.json({ storeId: store.id, ownerId: store.ownerId })
}

