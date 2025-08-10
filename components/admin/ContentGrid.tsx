"use client"
import { useContent } from '@/lib/hooks/useContent'
import { DataTable } from '@/components/common/DataTable'
import ContentActions from '@/components/store/ContentActions'
import ContentEditModal from '@/components/store/ContentEditModal'
import { useState } from 'react'

export default function ContentGrid({ storeId }: { storeId?: string }){
  const { data = [], isLoading } = useContent(storeId)
  if (isLoading) return <div>Cargando...</div>
  const [editing, setEditing] = useState<any|null>(null)
  const columns = [
    { key: 'title', header: 'Título' },
    { key: 'kind', header: 'Tipo' },
    { key: 'source', header: 'Origen' },
    { key: 'status', header: 'Estado' },
    { key: 'createdAt', header: 'Fecha', render: (r:any)=> new Date(String(r.createdAt)).toLocaleString() },
    { key: 'actions', header: 'Acciones', render: (r:any)=> (
      <div className="flex gap-2">
        <button className="rounded-md border px-2 py-1" onClick={()=> setEditing(r)}>Editar</button>
        <ContentActions row={r} />
      </div>
    ) },
  ]
  return (
    <>
      <DataTable rows={data} columns={columns as any} />
      {editing && <ContentEditModal open onClose={()=> setEditing(null)} storeId={editing.storeId} initial={editing} />}
    </>
  )
}

