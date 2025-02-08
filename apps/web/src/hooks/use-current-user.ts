import { useQuery } from "@tanstack/react-query"

import type { User } from "@genz-deezer/core"

import { authTokenStateUseCase, userUseCase } from "@/lib/usecases"

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: () => userUseCase.getCurrentUser(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: false,
    enabled: authTokenStateUseCase.isAuthenticated(),
    gcTime: 0
  })
}
