"use client"
import Link from 'next/link'
import { useStores } from '@/lib/hooks/useStores'

export default function StoresSelector(){
  const { data, isLoading } = useStores()
  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Selecciona una tienda</h1>
      {isLoading ? <div>Cargando...</div> : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((s: any)=> (
            <li key={s.id} className="rounded-xl border p-4 bg-black/10">
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-muted">{s.slug}</div>
              <Link className="inline-block mt-3 text-primary underline" href={`/stores/${s.id}`}>Entrar</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

