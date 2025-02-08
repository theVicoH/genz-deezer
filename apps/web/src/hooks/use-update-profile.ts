import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "./use-toast"

import { userUseCase } from "@/lib/usecases"
import { QueryKeys } from "@/types/query-keys"

export function useUpdateProfile() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await userUseCase.updateProfile(email) as unknown as { success: boolean }

      if (!response.success) {
        throw new Error("La mise à jour du profil a échoué")
      }

      return response.success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] })
      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour avec succès"
      })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      })
    }
  })
}
