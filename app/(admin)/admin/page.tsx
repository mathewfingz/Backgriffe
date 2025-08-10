"use client"
import { useEffect, useMemo, useState } from 'react'
import { DataTable } from '@/components/common/DataTable'
import StatsCard from '@/components/common/StatsCard'
import { useAdminRealtime } from '@/lib/hooks/useRealtime'

export default function AdminHome(){
  const [stats, setStats] = useState({ stores: 0, content: 0, uploads: 0 })
  const [events, setEvents] = useState<any[]>([])

  async function load(){
    const [stores, content, uploads] = await Promise.all([
      fetch('/api/stores').then(r=>r.json()),
      fetch('/api/content').then(r=>r.json()),
      fetch('/api/uploads?storeId=000000000000000000000000').then(r=> r.ok? r.json(): []), // placeholder; real uploads metric via server service
    ])
    setStats({ stores: stores.length, content: content.length, uploads: uploads.length || 0 })
  }

  useEffect(()=>{ load() }, [])

  useAdminRealtime(['content.created','content.updated','content.deleted','upload.created'], (e, payload)=>{
    setEvents(prev=> [{ type: e, ...payload }, ...prev].slice(0, 10))
  })

  const columns = useMemo(()=> ([
    { key: 'title', header: 'Título' },
    { key: 'kind', header: 'Tipo' },
    { key: 'source', header: 'Origen' },
    { key: 'status', header: 'Estado' },
    { key: 'createdAt', header: 'Fecha', render: (r:any)=> new Date(r.createdAt).toLocaleString() },
  ]), [])

  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Total Stores" value={stats.stores} />
        <StatsCard label="Total Content" value={stats.content} />
        <StatsCard label="Uploads" value={stats.uploads} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-display mb-3">Eventos recientes</h2>
        <DataTable rows={events as any} columns={columns as any} />
      </div>
    </main>
  )
}

