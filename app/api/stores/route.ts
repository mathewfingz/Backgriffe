import { NextRequest, NextResponse } from 'next/server'
import { listStores, createStore } from '@/server/services/stores'

export async function GET(){
  const items = await listStores()
  return NextResponse.json(items)
}

export async function POST(req: NextRequest){
  try {
    const body = await req.json()
    const created = await createStore(body)
    return NextResponse.json(created, { status: 201 })
  } catch (err: any){
    const status = err?.code === 'NOT_FOUND' ? 404 : 400
    return NextResponse.json({ code: err?.code ?? 'VAL_STORE', message: err?.message ?? 'Invalid payload' }, { status })
  }
}

