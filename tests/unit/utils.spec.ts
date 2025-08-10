import { describe, it, expect } from 'vitest'
import { canAccessStore } from '@/lib/utils/permissions'

describe('permissions', ()=>{
  it('admin can access any store', ()=>{
    expect(canAccessStore({ id: 'u1', role: 'ADMIN' }, { ownerId: 'u2' })).toBe(true)
  })
  it('owner can access own store', ()=>{
    expect(canAccessStore({ id: 'u1', role: 'STORE_OWNER' }, { ownerId: 'u1' })).toBe(true)
  })
  it('non-owner cannot access other store', ()=>{
    expect(canAccessStore({ id: 'u1', role: 'STORE_OWNER' }, { ownerId: 'u2' })).toBe(false)
  })
})

