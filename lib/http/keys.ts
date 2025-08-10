export const qk = {
  stores: ['stores'] as const,
  store: (id: string) => ['store', id] as const,
  content: (id?: string) => ['content', id ?? 'all'] as const,
  uploads: (id: string) => ['uploads', id] as const,
}

