"use client"
import { z } from 'zod'
import { useState } from 'react'
import { useCreateContent, useUpdateContent } from '@/lib/hooks/useContent'

const schema = z.object({
  storeId: z.string().cuid(),
  title: z.string().min(3),
  body: z.string().optional(),
  kind: z.enum(['POST','PRODUCT','MEDIA','NOTE']).default('POST'),
  status: z.enum(['DRAFT','PUBLISHED','ARCHIVED']).default('DRAFT'),
})

export default function ContentForm({ storeId, initial }:{ storeId: string, initial?: any }){
  const [error, setError] = useState<string>()
  const createM = useCreateContent()
  const updateM = useUpdateContent()
  return (
    <form className="space-y-3" onSubmit={async (e)=>{
      e.preventDefault()
      const form = e.currentTarget
      const fd = new FormData(form)
      const payload = {
        storeId,
        title: String(fd.get('title')||''),
        body: String(fd.get('body')||''),
        kind: String(fd.get('kind')||'POST'),
        status: String(fd.get('status')||'DRAFT'),
      }
      const parsed = schema.safeParse(payload)
      if(!parsed.success){ setError(parsed.error.issues[0]?.message); return }
      try {
        if(initial?.id) await updateM.mutateAsync({ id: initial.id, ...parsed.data })
        else await createM.mutateAsync(parsed.data)
        setError(undefined)
      } catch (err: any){ setError(err?.message || 'Error') }
    }}>
      <div>
        <label className="block text-sm mb-1">Título</label>
        <input name="title" defaultValue={initial?.title} required className="w-full h-10 rounded-md border px-3 bg-transparent"/>
      </div>
      <div>
        <label className="block text-sm mb-1">Cuerpo</label>
        <textarea name="body" defaultValue={initial?.body} className="w-full min-h-24 rounded-md border px-3 bg-transparent"/>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Tipo</label>
          <select name="kind" defaultValue={initial?.kind ?? 'POST'} className="w-full h-10 rounded-md border px-3 bg-transparent">
            {['POST','PRODUCT','MEDIA','NOTE'].map(k=> <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Estado</label>
          <select name="status" defaultValue={initial?.status ?? 'DRAFT'} className="w-full h-10 rounded-md border px-3 bg-transparent">
            {['DRAFT','PUBLISHED','ARCHIVED'].map(k=> <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm" role="status" aria-live="polite">{error}</div>}
      <button className="rounded-md bg-primary text-black px-4 py-2">{initial?.id? 'Guardar':'Crear'}</button>
    </form>
  )
}

