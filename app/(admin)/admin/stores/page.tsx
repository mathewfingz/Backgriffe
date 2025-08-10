import StoresCrud from '@/components/admin/StoresCrud'

export default function AdminStoresPage(){
  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Tiendas</h1>
      <StoresCrud />
    </main>
  )
}

