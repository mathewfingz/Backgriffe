"use client"
import { useState } from 'react'

export default function ConfirmDialog({
  title = 'Confirmar', description = '¿Estás seguro?',
  confirmText = 'Confirmar', cancelText = 'Cancelar',
  onConfirm
}:{ title?: string, description?: string, confirmText?: string, cancelText?: string, onConfirm: ()=>Promise<void>|void }){
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <>
      <button className="rounded-md border px-3 py-2" onClick={()=>setOpen(true)}>{title}</button>
      {open && (
        <div role="dialog" aria-modal className="fixed inset-0 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-bg text-fg border p-6">
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-sm text-muted mt-1">{description}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-md border px-3 py-2" onClick={()=>setOpen(false)} disabled={loading}>{cancelText}</button>
              <button className="rounded-md bg-primary text-black px-3 py-2" disabled={loading} onClick={async()=>{
                try { setLoading(true); await onConfirm(); setOpen(false) } finally { setLoading(false) }
              }}>{confirmText}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

