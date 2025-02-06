import jwt from 'jsonwebtoken';
import type { Context } from './types';
import { config } from './config/env';

export const getContext = async ({ req }: { req: { headers: { authorization?: string } } }): Promise<Context> => {
  const auth = req.headers.authorization || '';
  
  if (!auth) {
    return { userId: null };
  }

  try {
    const token = auth.split('Bearer ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };
    return { userId: decoded.userId };
  } catch (error) {
    return { userId: null };
  }
};