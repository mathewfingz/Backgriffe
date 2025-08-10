"use client"
import { useEffect, useMemo, useState } from 'react'
import UploadDropzone from '@/components/common/UploadDropzone'
import { DataTable } from '@/components/common/DataTable'
import { useParams } from 'next/navigation'

export default function StoreUploads(){
  const { storeId } = useParams<{ storeId: string }>()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  async function load(){
    setLoading(true)
    try { const res = await fetch(`/api/uploads?storeId=${storeId}`); const json = await res.json(); setItems(json) } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [storeId])
  const columns = useMemo(()=> ([
    { key: 'fileKey', header: 'Archivo' },
    { key: 'mime', header: 'Tipo' },
    { key: 'size', header: 'Tamaño' },
    { key: 'createdAt', header: 'Fecha', render: (r:any)=> new Date(r.createdAt).toLocaleString() },
  ]), [])
  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Uploads</h1>
      <div className="rounded-xl border p-4 bg-black/10">
        <UploadDropzone storeId={storeId} onClientUploadComplete={load} />
      </div>
      <div className="mt-6">
        {loading? <div>Cargando...</div> : <DataTable rows={items} columns={columns as any} />}
      </div>
    </main>
  )
}

