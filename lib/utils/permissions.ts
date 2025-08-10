export function canAccessStore(user: { id: string, role: string }, store: { ownerId: string }){
  return user.role === 'ADMIN' || user.id === store.ownerId
}

