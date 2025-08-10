"use client"
import Link from 'next/link'

export default function QuickActions({ storeId }:{ storeId: string }){
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/stores/${storeId}/content`} className="rounded-md bg-primary text-black px-3 py-2">Crear Contenido</Link>
      <Link href={`/stores/${storeId}/uploads`} className="rounded-md border px-3 py-2">Subir Archivos</Link>
      <Link href={`/stores/${storeId}/settings`} className="rounded-md border px-3 py-2">Ajustes</Link>
    </div>
  )
}

