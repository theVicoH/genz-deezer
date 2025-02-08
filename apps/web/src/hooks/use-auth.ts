import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { useToast } from "@/hooks/use-toast"
import { authTokenStateUseCase, authUseCase } from "@/lib/usecases"

export function useAuth() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => authUseCase.login(credentials),
    onSuccess: (data) => {
      authTokenStateUseCase.setToken(data.token)
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      toast({
        title: "Connexion réussie !",
        description: "Vous êtes maintenant connecté."
      })
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      })
    }
  })

  const registerMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => authUseCase.register(credentials),
    onSuccess: () => {
      toast({
        title: "Inscription réussie !",
        description: "Vous pouvez maintenant vous connecter."
      })
      navigate("/login")
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      })
    }
  })

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error
  }
}
