"use client"
import ConfirmDialog from '@/components/common/ConfirmDialog'
import { useDeleteContent, useUpdateContent } from '@/lib/hooks/useContent'
import { useState } from 'react'

export default function ContentActions({ row }:{ row: any }){
  const delM = useDeleteContent()
  const updM = useUpdateContent()
  const [loading, setLoading] = useState(false)
  const archive = async ()=> {
    setLoading(true)
    try { await updM.mutateAsync({ id: row.id, status: 'ARCHIVED' }) } finally { setLoading(false) }
  }
  return (
    <div className="flex gap-2">
      <button className="rounded-md border px-2 py-1" disabled={loading} onClick={archive}>Archivar</button>
      <ConfirmDialog title="Eliminar" description="¿Eliminar este contenido?" confirmText="Eliminar" onConfirm={async()=> delM.mutateAsync({ id: row.id, storeId: row.storeId })} />
    </div>
  )
}

