export default function EmptyState({ title = 'Sin datos', description }: { title?: string, description?: string }){
  return (
    <div className="rounded-xl border p-8 text-center text-muted">
      <div className="text-fg font-medium">{title}</div>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  )
}

