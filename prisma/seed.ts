import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

const db = new PrismaClient()

async function main(){
  const adminEmail = process.env.SEED_ADMIN_EMAIL!
  const adminPass  = process.env.SEED_ADMIN_PASSWORD!
  if (!adminEmail || !adminPass){
    console.warn('Seed skipped: SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD missing')
    return
  }
  const admin = await db.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, password: await hash(adminPass), role: 'ADMIN' },
    update: {}
  })
  // only one admin is required
  console.log('Admin:', admin.email)
}

main().finally(()=> db.$disconnect())

