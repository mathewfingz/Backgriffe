import { db } from '@/server/db/client'

export async function isAdmin(user: any){
  return user?.role === 'ADMIN'
}

export async function isStoreOwnerOrAdmin(user: any, storeId: string){
  if (user?.role === 'ADMIN') return true
  const store = await db.store.findUnique({ where: { id: storeId }, select: { ownerId: true } })
  return !!store && store.ownerId === user?.id
}

