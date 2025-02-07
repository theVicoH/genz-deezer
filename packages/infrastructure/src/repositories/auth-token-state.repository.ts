import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { AuthTokenStateRepository } from "@genz-deezer/core"

interface AuthTokenState {
  token: string | null
}

const useAuthTokenStore = create<AuthTokenState>()(persist(
  () => ({
    token: null as string | null
  }),
  {
    name: "auth-token-storage"
  }
))

export class ZustandAuthTokenStateRepository implements AuthTokenStateRepository {
  getToken(): string | null {
    return useAuthTokenStore.getState().token
  }

  setToken(token: string): void {
    useAuthTokenStore.setState({ token })
  }

  clearToken(): void {
    useAuthTokenStore.setState({ token: null })
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}
