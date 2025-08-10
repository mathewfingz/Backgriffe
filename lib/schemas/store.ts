import { z } from 'zod'

export const storeCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  ownerId: z.string().cuid()
}).strict()

export const storeUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/).optional(),
  isActive: z.boolean().optional(),
}).strict()

