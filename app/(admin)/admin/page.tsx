export default function AdminHome(){
  return (
    <main className="container-safe py-8">
      <h1 className="text-3xl font-display mb-6">Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4 bg-black/10">
          <div className="text-sm text-muted">Total Stores</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-xl border p-4 bg-black/10">
          <div className="text-sm text-muted">Total Content</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-xl border p-4 bg-black/10">
          <div className="text-sm text-muted">Uploads</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
      </div>
    </main>
  )
}

