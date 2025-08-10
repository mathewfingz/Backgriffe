"use client"
import Link from 'next/link'

export default function StoreSelector({ stores }:{ stores: { id: string, name: string, slug: string }[] }){
  if(!stores?.length) return <div className="text-muted">No hay tiendas</div>
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stores.map(s=> (
        <li key={s.id} className="rounded-xl border p-4 bg-black/10">
          <div className="font-medium">{s.name}</div>
          <div className="text-sm text-muted">{s.slug}</div>
          <Link className="inline-block mt-3 text-primary underline" href={`/stores/${s.id}`}>Entrar</Link>
        </li>
      ))}
    </ul>
  )
}

