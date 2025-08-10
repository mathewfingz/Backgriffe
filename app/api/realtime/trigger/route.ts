import { NextRequest, NextResponse } from 'next/server'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'

export async function POST(req: NextRequest){
  const body = await req.json()
  const { channel, event, payload } = body || {}
  if (!event) return NextResponse.json({ code: 'VAL_REALTIME', message: 'event required' }, { status: 400 })
  if (channel === 'admin-global') await triggerAdmin(event, payload)
  else if (typeof channel === 'string' && channel.startsWith('store-')) await triggerStore(channel.slice(6), event, payload)
  else return NextResponse.json({ code: 'VAL_REALTIME', message: 'invalid channel' }, { status: 400 })
  return NextResponse.json({ ok: true })
}

