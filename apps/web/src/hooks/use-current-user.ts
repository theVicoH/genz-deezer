import { useQuery } from "@tanstack/react-query"

import type { User } from "@genz-deezer/core"

import { userUseCase } from "@/lib/usecases"

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: () => userUseCase.getCurrentUser()
  })
}
