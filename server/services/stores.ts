import { db } from '@/server/db/client'
import { z } from 'zod'

export const storeCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  ownerId: z.string().cuid()
}).strict()

export type StoreCreateInput = z.infer<typeof storeCreateSchema>

export async function listStores(){
  return db.store.findMany({ orderBy: { createdAt: 'desc' }})
}

export async function createStore(input: StoreCreateInput){
  const data = storeCreateSchema.parse(input)
  const owner = await db.user.findUnique({ where: { id: data.ownerId }})
  if(!owner) throw Object.assign(new Error('Owner not found'), { code: 'NOT_FOUND' })
  return db.store.create({ data })
}

export const storeUpdateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).optional(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/).optional(),
  isActive: z.boolean().optional(),
}).strict()

export type StoreUpdateInput = z.infer<typeof storeUpdateSchema>

export async function updateStore(input: StoreUpdateInput){
  const { id, ...data } = storeUpdateSchema.parse(input)
  return db.store.update({ where: { id }, data })
}

export async function deleteStore(id: string){
  return db.store.delete({ where: { id } })
}


