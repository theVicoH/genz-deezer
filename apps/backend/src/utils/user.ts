import type { DBUser, User } from '../types';

export const dbUserToUser = (dbUser: DBUser): User => ({
  id: dbUser.id,
  email: dbUser.email,
  createdAt: dbUser.created_at
});