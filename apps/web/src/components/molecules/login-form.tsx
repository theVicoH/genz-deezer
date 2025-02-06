import { useState } from "react"

import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

import { Alert, AlertDescription } from "../atoms/alert"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"

import type { LoginMutationResponse } from "@/types/graphql"


import { LOGIN } from "@/gql/graphql"
import { useAuthStore } from "@/stores/auth-store"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const [login, { loading }] = useMutation<LoginMutationResponse>(LOGIN, {
    onCompleted: (data) => {
      setAuth(data.login.token, data.login.user)
      navigate("/dashboard")
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (values: LoginFormValues) => {
    setError("")
    login({ variables: values })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
      <div className="text-center">
        <span className="text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/register")}>
            S'inscrire
          </Button>
        </span>
      </div>
    </div>
  )
}

export default LoginForm
