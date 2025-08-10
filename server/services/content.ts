import { db } from '@/server/db/client'
import { contentCreateSchema, contentUpdateSchema } from '@/lib/schemas/content'

export async function listContent(storeId?: string){
  return db.content.findMany({ where: storeId ? { storeId } : {}, orderBy: { createdAt: 'desc' }})
}

export async function createContent(input: unknown, createdBy: string){
  const data = contentCreateSchema.parse(input)
  const store = await db.store.findUnique({ where: { id: data.storeId }})
  if(!store) throw Object.assign(new Error('Store not found'), { code: 'NOT_FOUND' })
  return db.content.create({ data: { ...data, createdBy, source: data.source ?? store.slug }})
}

export async function updateContent(id: string, input: unknown){
  const data = contentUpdateSchema.parse(input)
  return db.content.update({ where: { id }, data })
}

export async function deleteContent(id: string){
  return db.content.delete({ where: { id } })
}


