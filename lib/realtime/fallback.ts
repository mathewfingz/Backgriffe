"use client"

let adminChannel: BroadcastChannel | null = null

function getAdminChannel(){
  if (typeof window === 'undefined') return null
  if (!adminChannel) adminChannel = new BroadcastChannel('admin-global')
  return adminChannel
}

export function sendAdminEvent(event: string, payload: unknown){
  const ch = getAdminChannel()
  ch?.postMessage({ event, payload })
}

export function subscribeAdmin(events: string[], onEvent:(e:string,p:any)=>void){
  const ch = getAdminChannel()
  if (!ch) return ()=>{}
  const handler = (ev: MessageEvent)=>{
    const { event, payload } = ev.data || {}
    if (events.includes(event)) onEvent(event, payload)
  }
  ch.addEventListener('message', handler)
  return ()=> ch.removeEventListener('message', handler)
}

