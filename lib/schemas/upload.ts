import { z } from 'zod'

export const uploadMetaSchema = z.object({
  storeId: z.string().cuid(),
  fileKey: z.string(),
  url: z.string().url(),
  mime: z.string(),
  size: z.number().int().positive()
}).strict()

