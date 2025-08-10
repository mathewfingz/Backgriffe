'use client'
import PusherClient from 'pusher-js'
import { useEffect } from 'react'

export function useAdminRealtime(events: string[], onEvent: (e:string,p:any)=>void){
  useEffect(()=>{
    const p = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER! })
    const ch = p.subscribe('admin-global')
    events.forEach(ev=> ch.bind(ev, (payload:any)=> onEvent(ev,payload)) )
    return ()=> { events.forEach(ev=> ch.unbind(ev)); p.unsubscribe('admin-global'); p.disconnect() }
  },[events,onEvent])
}

export function useStoreRealtime(storeId:string, events:string[], onEvent:(e:string,p:any)=>void){
  useEffect(()=>{
    const p = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER! })
    const ch = p.subscribe(`store-${storeId}`)
    events.forEach(ev=> ch.bind(ev, (payload:any)=> onEvent(ev,payload)) )
    return ()=> { events.forEach(ev=> ch.unbind(ev)); p.unsubscribe(`store-${storeId}`); p.disconnect() }
  },[storeId,events,onEvent])
}

