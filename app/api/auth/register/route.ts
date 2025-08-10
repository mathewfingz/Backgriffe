import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db/client'
import { registerSchema } from '@/lib/schemas/user'

export const runtime = 'nodejs'

export async function POST(req: NextRequest){
  try{
    const json = await req.json()
    const parsed = registerSchema.safeParse(json)
    if(!parsed.success){
      return NextResponse.json({ code: 'VAL_REGISTER', issues: parsed.error.flatten() }, { status: 400 })
    }
    const { email, password, name } = parsed.data
    // Fail fast if exists
    const exists = await db.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ code: 'EMAIL_TAKEN' }, { status: 409 })
    const { hash } = await import('argon2')
    const hashed = await hash(password)
    const created = await db.user.create({ data: { email, name: name ?? null, password: hashed, role: 'STORE_OWNER' }})
    return NextResponse.json({ id: created.id, email: created.email })
  } catch (err){
    return NextResponse.json({ code: 'REGISTER_ERR' }, { status: 500 })
  }
}


