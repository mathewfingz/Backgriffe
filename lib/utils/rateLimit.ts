import type { NextRequest } from 'next/server'

const WINDOW_MS = 60_000
const MAX = 60
const ipHits = new Map<string, { count: number, reset: number }>()

export function rateLimit(req: NextRequest){
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'local'
  const now = Date.now()
  const rec = ipHits.get(ip)
  if (!rec || rec.reset < now){
    ipHits.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (rec.count >= MAX) return false
  rec.count += 1
  return true
}

