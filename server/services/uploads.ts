import { db } from '@/server/db/client'
import { triggerAdmin, triggerStore } from '@/server/realtime/pusher'
import { z } from 'zod'

const uploadMetaSchema = z.object({
  storeId: z.string().cuid(),
  fileKey: z.string(),
  url: z.string().url(),
  mime: z.string(),
  size: z.number().int().positive()
}).strict()

export type UploadMetaInput = z.infer<typeof uploadMetaSchema>

export async function saveUploadMetadata(input: unknown){
  const data = uploadMetaSchema.parse(input)
  const created = await db.upload.create({ data })
  await triggerAdmin('upload.created', created)
  await triggerStore(created.storeId, 'upload.created', created)
  return created
}


