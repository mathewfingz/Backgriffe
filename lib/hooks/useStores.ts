'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { qk } from '@/lib/http/keys'

async function http<T>(input: RequestInfo, init?: RequestInit){
  const res = await fetch(input, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers || {}) }})
  if(!res.ok) throw await res.json()
  return res.json() as Promise<T>
}

export function useStores(){
  return useQuery({ queryKey: qk.stores, queryFn: ()=> http<any[]>('/api/stores') })
}

export function useCreateStore(){
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { name: string, slug: string, ownerId: string })=> http('/api/stores', { method: 'POST', body: JSON.stringify(payload) }),
    onSuccess: ()=> qc.invalidateQueries({ queryKey: qk.stores })
  })
}

export function useUpdateStore(){
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { id: string } & Record<string, unknown>)=> http(`/api/stores/${payload.id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
    onSuccess: ()=> qc.invalidateQueries({ queryKey: qk.stores })
  })
}

export function useDeleteStore(){
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { id: string })=> http(`/api/stores/${payload.id}`, { method: 'DELETE' }),
    onSuccess: ()=> qc.invalidateQueries({ queryKey: qk.stores })
  })
}

