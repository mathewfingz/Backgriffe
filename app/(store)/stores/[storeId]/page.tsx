export default function StoreHome(){
  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4 bg-black/10">KPIs</div>
        <div className="rounded-xl border p-4 bg-black/10">Últimos uploads</div>
      </div>
    </main>
  )
}

