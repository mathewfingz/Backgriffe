export default function StatsCard({ label, value }: { label: string, value: string | number }){
  return (
    <div className="rounded-xl border p-4 bg-black/10">
      <div className="text-sm text-muted">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

