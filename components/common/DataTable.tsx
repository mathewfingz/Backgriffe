"use client"
import { useMemo, useState } from 'react'

export function DataTable<T extends { id: string }>({ rows, columns }:{
  rows: T[],
  columns: { key: keyof T, header: string, render?:(row:T)=>React.ReactNode }[]
}){
  const [q,setQ]=useState('')
  const filtered = useMemo(()=> rows.filter(r=> JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows,q])
  return (
    <div className="space-y-3">
      <input aria-label="Buscar" className="w-full h-10 rounded-md border bg-transparent px-3" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="overflow-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead><tr>{columns.map(c=> <th key={String(c.key)} className="px-3 py-2 text-left">{c.header}</th>)}</tr></thead>
          <tbody>{filtered.map(r=> (
            <tr key={r.id} className="border-t">
              {columns.map(c=> <td key={String(c.key)} className="px-3 py-2">{c.render? c.render(r): String(r[c.key])}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

