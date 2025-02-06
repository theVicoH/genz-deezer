import jwt from "jsonwebtoken"

import { config } from "../config/env"

import type { Context } from "../types"

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: parseInt(config.JWT_EXPIRATION) })
}

export const checkAuth = (context: Context): string => {
  if (!context.userId) {
    throw new Error("Vous devez être connecté pour effectuer cette action")
  }

  return context.userId
}
