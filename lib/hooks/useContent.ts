'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { qk } from '@/lib/http/keys'

async function http<T>(input: RequestInfo, init?: RequestInit){
  const res = await fetch(input, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers || {}) }})
  if(!res.ok) throw await res.json()
  return res.json() as Promise<T>
}

export function useContent(storeId?: string){
  return useQuery({ queryKey: qk.content(storeId), queryFn: ()=> http<any[]>(`/api/content${storeId? `?storeId=${storeId}`:''}`) })
}

export function useCreateContent(){
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: any)=> http('/api/content', { method: 'POST', body: JSON.stringify(payload) }),
    onSuccess: (created: any)=> {
      qc.invalidateQueries({ queryKey: qk.content(created.storeId) })
      qc.invalidateQueries({ queryKey: qk.content('all' as any) })
    }
  })
}

export function useUpdateContent(){
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: any)=> http(`/api/content/${payload.id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
    onSuccess: (updated: any)=> {
      qc.invalidateQueries({ queryKey: qk.content(updated.storeId) })
      qc.invalidateQueries({ queryKey: qk.content('all' as any) })
    }
  })
}

export function useDeleteContent(){
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { id: string, storeId: string })=> http(`/api/content/${payload.id}`, { method: 'DELETE' }),
    onSuccess: (_: any, v)=> {
      qc.invalidateQueries({ queryKey: qk.content(v.storeId) })
      qc.invalidateQueries({ queryKey: qk.content('all' as any) })
    }
  })
}

