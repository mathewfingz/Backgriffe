import { redirect } from 'next/navigation'
import { auth } from '@/server/auth/config'

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/login')
  const role = (session as any).role
  if (role === 'ADMIN') redirect('/admin')
  redirect('/stores')
}
