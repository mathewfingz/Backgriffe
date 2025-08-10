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
    onMutate: async (newItem: any)=>{
      await Promise.all([
        qc.cancelQueries({ queryKey: qk.content(newItem.storeId) }),
        qc.cancelQueries({ queryKey: qk.content('all' as any) }),
      ])
      const prevStore = qc.getQueryData<any[]>(qk.content(newItem.storeId))
      const prevAll = qc.getQueryData<any[]>(qk.content('all' as any))
      if (prevStore) qc.setQueryData<any[]>(qk.content(newItem.storeId), [{ id: 'opt', ...newItem, createdAt: new Date().toISOString() }, ...prevStore])
      if (prevAll) qc.setQueryData<any[]>(qk.content('all' as any), [{ id: 'opt', ...newItem, createdAt: new Date().toISOString(), source: prevAll[0]?.source }, ...prevAll])
      return { prevStore, prevAll, newItem }
    },
    onError: (_err, _newItem, ctx)=>{
      if (!ctx) return
      if (ctx.prevStore) qc.setQueryData(qk.content(ctx.newItem.storeId), ctx.prevStore)
      if (ctx.prevAll) qc.setQueryData(qk.content('all' as any), ctx.prevAll)
    },
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
    onMutate: async (payload: any)=>{
      await Promise.all([
        qc.cancelQueries({ queryKey: qk.content(payload.storeId) }),
        qc.cancelQueries({ queryKey: qk.content('all' as any) }),
      ])
      const prevStore = qc.getQueryData<any[]>(qk.content(payload.storeId))
      const prevAll = qc.getQueryData<any[]>(qk.content('all' as any))
      if (prevStore) qc.setQueryData<any[]>(qk.content(payload.storeId), prevStore.map(r=> r.id===payload.id? { ...r, ...payload }: r))
      if (prevAll) qc.setQueryData<any[]>(qk.content('all' as any), prevAll.map(r=> r.id===payload.id? { ...r, ...payload }: r))
      return { prevStore, prevAll, payload }
    },
    onError: (_err, _payload, ctx)=>{
      if (!ctx) return
      if (ctx.prevStore) qc.setQueryData(qk.content(ctx.payload.storeId), ctx.prevStore)
      if (ctx.prevAll) qc.setQueryData(qk.content('all' as any), ctx.prevAll)
    },
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
    onMutate: async (payload: { id: string, storeId: string })=>{
      await Promise.all([
        qc.cancelQueries({ queryKey: qk.content(payload.storeId) }),
        qc.cancelQueries({ queryKey: qk.content('all' as any) }),
      ])
      const prevStore = qc.getQueryData<any[]>(qk.content(payload.storeId))
      const prevAll = qc.getQueryData<any[]>(qk.content('all' as any))
      if (prevStore) qc.setQueryData<any[]>(qk.content(payload.storeId), prevStore.filter(r=> r.id!==payload.id))
      if (prevAll) qc.setQueryData<any[]>(qk.content('all' as any), prevAll.filter(r=> r.id!==payload.id))
      return { prevStore, prevAll, payload }
    },
    onError: (_err, _payload, ctx)=>{
      if (!ctx) return
      if (ctx.prevStore) qc.setQueryData(qk.content(ctx.payload.storeId), ctx.prevStore)
      if (ctx.prevAll) qc.setQueryData(qk.content('all' as any), ctx.prevAll)
    },
    onSuccess: (_: any, v)=> {
      qc.invalidateQueries({ queryKey: qk.content(v.storeId) })
      qc.invalidateQueries({ queryKey: qk.content('all' as any) })
    }
  })
}

