"use client"
import { useContent } from '@/lib/hooks/useContent'
import { DataTable } from '@/components/common/DataTable'

export default function ContentGrid({ storeId }: { storeId?: string }){
  const { data = [], isLoading } = useContent(storeId)
  if (isLoading) return <div>Cargando...</div>
  return (
    <DataTable rows={data} columns={[
      { key: 'title', header: 'Título' },
      { key: 'kind', header: 'Tipo' },
      { key: 'source', header: 'Origen' },
      { key: 'status', header: 'Estado' },
      { key: 'createdAt', header: 'Fecha', render: (r)=> new Date(String((r as any).createdAt)).toLocaleString() },
    ]} />
  )
}

