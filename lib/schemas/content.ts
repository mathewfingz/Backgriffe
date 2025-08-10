import { z } from 'zod'

export const contentCreateSchema = z.object({
  storeId: z.string().cuid(),
  title: z.string().min(3),
  body: z.string().optional(),
  kind: z.enum(['POST','PRODUCT','MEDIA','NOTE']).default('POST'),
  status: z.enum(['DRAFT','PUBLISHED','ARCHIVED']).default('DRAFT'),
  source: z.string().optional()
}).strict()

export const contentUpdateSchema = contentCreateSchema.partial().strict()


