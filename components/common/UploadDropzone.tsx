"use client"
import { UploadDropzone as UDrop } from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

export default function UploadDropzone({ storeId, onClientUploadComplete }:{ storeId: string, onClientUploadComplete?: ()=>void }){
  return (
    <UDrop<OurFileRouter, 'storeUploader'>
      endpoint="storeUploader"
      input={{ storeId }}
      onClientUploadComplete={() => {
        onClientUploadComplete?.()
      }}
      onUploadError={(e)=>{
        console.error(e)
        alert('Error de subida')
      }}
      appearance={{
        container: 'ut-container border rounded-xl p-6 bg-transparent',
        button: 'ut-button bg-primary text-black rounded-md px-4 py-2'
      }}
    />
  )
}

