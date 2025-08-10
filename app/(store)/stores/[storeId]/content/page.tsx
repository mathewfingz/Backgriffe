import ContentGrid from '@/components/admin/ContentGrid'
import ContentForm from '@/components/store/ContentForm'

export default function StoreContent({ params }: { params: { storeId: string }}){
  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Contenido de la Tienda</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContentGrid storeId={params.storeId} />
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-xl border p-4 bg-black/10">
            <h2 className="font-medium mb-3">Nuevo Contenido</h2>
            <ContentForm storeId={params.storeId} />
          </div>
        </div>
      </div>
    </main>
  )
}

