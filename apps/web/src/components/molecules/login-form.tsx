import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

import { Alert, AlertDescription } from "../atoms/alert"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"

import { useAuth } from "@/hooks/use-auth"
import { PublicRoutes } from "@/types/routes"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (values: LoginFormValues) => {
    login(values)
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-8 space-y-6">
      <h1 className="text-foreground text-4xl font-bold">Bienvenu GenZ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
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
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
      <div className="text-center">
        <span className="text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <Button variant="link" className="p-0" onClick={() => navigate(PublicRoutes.REGISTER)}>
            S'inscrire
          </Button>
        </span>
      </div>
    </div>
  )
}

export default LoginForm
