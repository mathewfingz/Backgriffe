"use client"
import { useEffect, useMemo, useState } from 'react'
import { DataTable } from '@/components/common/DataTable'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import { z } from 'zod'

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  ownerId: z.string().cuid(),
})

export default function StoresCrud(){
  const [items, setItems] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string>()

  async function load(){
    const res = await fetch('/api/stores')
    setItems(await res.json())
  }
  useEffect(()=>{ load() }, [])

  async function create(form: HTMLFormElement){
    const fd = new FormData(form)
    const payload = { name: String(fd.get('name')||''), slug: String(fd.get('slug')||''), ownerId: String(fd.get('ownerId')||'') }
    const parsed = createSchema.safeParse(payload)
    if(!parsed.success){ setError(parsed.error.issues[0]?.message); return }
    const res = await fetch('/api/stores', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(parsed.data) })
    if (!res.ok){ setError('Error al crear'); return }
    setOpen(false); setError(undefined); await load()
  }

  const columns = useMemo(()=> ([
    { key: 'name', header: 'Nombre' },
    { key: 'slug', header: 'Slug' },
    { key: 'ownerId', header: 'Owner' },
    { key: 'createdAt', header: 'Fecha', render: (r:any)=> new Date(r.createdAt).toLocaleString() },
  ]), [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <button className="rounded-md bg-primary text-black px-4 py-2" onClick={()=> setOpen(true)}>Nueva Tienda</button>
      </div>
      <DataTable rows={items} columns={columns as any} />
      {open && (
        <div role="dialog" aria-modal className="fixed inset-0 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-bg text-fg border p-6">
            <h2 className="text-lg font-medium">Crear Tienda</h2>
            <form className="space-y-3 mt-4" onSubmit={async (e)=>{ e.preventDefault(); await create(e.currentTarget) }}>
              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input name="name" required className="w-full h-10 rounded-md border px-3 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm mb-1">Slug</label>
                <input name="slug" required className="w-full h-10 rounded-md border px-3 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm mb-1">Owner ID</label>
                <input name="ownerId" required className="w-full h-10 rounded-md border px-3 bg-transparent" />
              </div>
              {error && <div className="text-red-500 text-sm" role="status" aria-live="polite">{error}</div>}
              <div className="flex justify-end gap-2">
                <button type="button" className="rounded-md border px-4 py-2" onClick={()=> setOpen(false)}>Cancelar</button>
                <button className="rounded-md bg-primary text-black px-4 py-2">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

