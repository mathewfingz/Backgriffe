"use client"
import { useEffect, useState } from 'react'
import ContentForm from '@/components/store/ContentForm'

export default function ContentEditModal({ open, onClose, storeId, initial }:{ open: boolean, onClose: ()=>void, storeId: string, initial: any }){
  const [isOpen, setIsOpen] = useState(open)
  useEffect(()=> setIsOpen(open), [open])
  if(!isOpen) return null
  return (
    <div role="dialog" aria-modal className="fixed inset-0 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-bg text-fg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Editar Contenido</h2>
          <button className="rounded-md border px-2 py-1" onClick={()=> { setIsOpen(false); onClose() }}>Cerrar</button>
        </div>
        <ContentForm storeId={storeId} initial={initial} />
      </div>
    </div>
  )
}

