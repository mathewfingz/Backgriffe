import Pusher from 'pusher'

const hasPusher = Boolean(
  process.env.PUSHER_APP_ID &&
  process.env.PUSHER_KEY &&
  process.env.PUSHER_SECRET &&
  process.env.PUSHER_CLUSTER
)

const pusher = hasPusher
  ? new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    })
  : null

export async function triggerAdmin(event: string, payload: unknown) {
  if (!pusher) return
  await pusher.trigger('admin-global', event, payload)
}

export async function triggerStore(storeId: string, event: string, payload: unknown) {
  if (!pusher) return
  await pusher.trigger(`store-${storeId}`, event, payload)
}

