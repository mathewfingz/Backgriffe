import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'

export async function GET(){
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' }})
  return NextResponse.json(users)
}

export async function POST(req: NextRequest){
  const body = await req.json()
  if(!body?.email) return NextResponse.json({ code: 'VAL_USER', message: 'email required' }, { status: 400 })
  const created = await db.user.create({ data: { email: body.email, name: body.name ?? null, role: body.role ?? 'STAFF' }})
  return NextResponse.json(created, { status: 201 })
}

