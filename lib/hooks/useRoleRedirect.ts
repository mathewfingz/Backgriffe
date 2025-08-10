'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useRoleRedirect(storeId?: string){
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(()=>{
    if(status!== 'authenticated') return
    const role = (session as any)?.role
    if(role === 'ADMIN') router.replace('/admin' as any)
    else router.replace((storeId ? `/stores/${storeId}` : '/stores') as any)
  }, [status, session, router, storeId])
}

