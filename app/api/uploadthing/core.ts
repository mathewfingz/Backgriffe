import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { createNextRouteHandler } from 'uploadthing/next'
import { z } from 'zod'
import { auth } from '@/server/auth/config'
import { saveUploadMetadata } from '@/server/services/uploads'

const f = createUploadthing()

export const ourFileRouter = {
  storeUploader: f({
    image: { maxFileSize: '16MB' },
    video: { maxFileSize: '64MB' },
    'application/pdf': { maxFileSize: '16MB' }
  })
    .input(z.object({ storeId: z.string().cuid() }))
    .middleware(async ({ req, input }) => {
      const session = await auth()
      if (!session?.user) throw new Error('UNAUTHORIZED')
      const userId = (session.user as any).id ?? (session.user as any).sub
      return { userId: String(userId), storeId: input.storeId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await saveUploadMetadata({
        storeId: metadata.storeId,
        fileKey: file.key,
        url: file.url,
        mime: file.type,
        size: file.size
      })
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

export const { GET, POST } = createNextRouteHandler({ router: ourFileRouter })


