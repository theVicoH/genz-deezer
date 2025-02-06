import { useState } from "react"

import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

import type { RegisterMutationResponse } from "@/types/graphql"

import { Alert, AlertDescription } from "@/components/alert"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { REGISTER } from "@/gql/graphql"
import { useToast } from "@/hooks/use-toast"

const registerSchema = z
  .object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
  })

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const { toast } = useToast()

  const [register, { loading }] = useMutation<RegisterMutationResponse>(REGISTER, {
    onCompleted: () => {
      toast({
        title: "Inscription réussie !",
        description: "Vous pouvez maintenant vous connecter avec vos identifiants."
      })
      navigate("/login")
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const {
    register: registerField,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = ({ email, password }: RegisterFormValues) => {
    setError("")
    register({
      variables: {
        email,
        password
      }
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" {...registerField("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...registerField("password")}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...registerField("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </Button>
      </form>
      <div className="text-center">
        <span className="text-sm text-gray-500">
          Déjà un compte ?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
            Se connecter
          </Button>
        </span>
      </div>
    </div>
  )
}

export default RegisterForm
