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
      <svg
        width="107"
        height="31"
        viewBox="0 0 107 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_14)">
          <g clip-path="url(#clip1_1_14)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M37.9674 7.83278H43.8769C47.5359 7.83278 50.1233 10.267 50.1233 13.727C50.1233 17.187 47.5359 19.6212 43.8769 19.6212H37.9674V7.83278ZM42.5603 16.4368H43.632C44.7802 16.4368 45.3926 15.6714 45.3926 13.727C45.3926 11.7827 44.7802 11.0172 43.632 11.0172H42.5603V16.4368ZM60.5337 19.6212H50.8274V7.83278H60.5337V11.0172H55.4049V12.3798H60.2275V14.9824H55.4049V16.4368H60.5337V19.6212ZM71.3423 19.6212H61.636V7.83278H71.3423V11.0172H66.2136V12.3798H71.0362V14.9824H66.2136V16.4368H71.3423V19.6212ZM106.57 19.6212C105.909 17.8187 104.984 15.8953 103.739 13.7395C105.194 13.3126 106.065 12.395 106.065 10.9866C106.065 8.84322 104.09 7.83278 100.967 7.83278H94.5367V19.6212H99.1295V14.745C100.15 16.4636 100.902 18.0854 101.395 19.6212H106.57ZM99.1295 13.0993V11.0172H100.722C101.395 11.0172 101.778 11.3847 101.778 12.0583C101.778 12.7319 101.395 13.0993 100.722 13.0993H99.1295ZM93.4344 19.6212H83.728V7.83278H93.4344V11.0172H88.3057V12.3798H93.1283V14.9824H88.3057V16.4368H93.4344V19.6212ZM72.4448 11.0172H77.1839C75.2177 12.626 73.5995 14.4481 72.3529 16.4368V19.6212H82.7788V16.4368H77.5677C78.7618 14.6995 80.4305 12.9695 82.7788 11.0172V7.83278H72.4448V11.0172Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.049 5.11072C25.3252 3.50975 25.7305 2.503 26.1795 2.50109H26.1804C27.0177 2.50397 27.6963 5.99535 27.6963 10.306C27.6963 14.6166 27.0167 18.1108 26.1786 18.1108C25.8349 18.1108 25.5179 17.5175 25.2626 16.5233C24.8592 20.1628 24.022 22.6647 23.0529 22.6647C22.303 22.6647 21.63 21.1618 21.1782 18.7916C20.8698 23.2993 20.0934 26.4975 19.1859 26.4975C18.6164 26.4975 18.0971 25.2301 17.7128 23.1666C17.2505 27.4262 16.1826 30.4109 14.9373 30.4109C13.692 30.4109 12.6222 27.4272 12.1619 23.1666C11.7803 25.2301 11.2611 26.4975 10.6888 26.4975C9.78135 26.4975 9.00681 23.2993 8.69643 18.7916C8.24461 21.1618 7.57354 22.6647 6.82178 22.6647C5.85361 22.6647 5.01548 20.1637 4.61208 16.5233C4.35864 17.5204 4.03972 18.1108 3.69611 18.1108C2.85798 18.1108 2.17836 14.6166 2.17836 10.306C2.17836 5.99535 2.85798 2.50109 3.69611 2.50109C4.14602 2.50109 4.54848 3.51071 4.82754 5.11072C5.27461 2.35012 6.00073 0.555878 6.82178 0.555878C7.7966 0.555878 8.64138 3.0934 9.04099 6.77805C9.43205 4.09629 10.0253 2.38666 10.6897 2.38666C11.6209 2.38666 12.4125 5.74919 12.7058 10.4396C13.2572 8.03479 14.0556 6.52612 14.9393 6.52612C15.8229 6.52612 16.6212 8.03575 17.1717 10.4396C17.466 5.74919 18.2566 2.38666 19.1878 2.38666C19.8512 2.38666 20.4436 4.09629 20.8365 6.77805C21.2352 3.0934 22.08 0.555878 23.0548 0.555878C23.873 0.555878 24.6019 2.35109 25.049 5.11072ZM0.00958252 9.53831C0.00958252 7.61136 0.394953 6.04886 0.870495 6.04886C1.34604 6.04886 1.73141 7.61136 1.73141 9.53831C1.73141 11.4652 1.34604 13.0278 0.870495 13.0278C0.394953 13.0278 0.00958252 11.4652 0.00958252 9.53831ZM28.1427 9.53831C28.1427 7.61136 28.528 6.04886 29.0036 6.04886C29.479 6.04886 29.8645 7.61136 29.8645 9.53831C29.8645 11.4652 29.479 13.0278 29.0036 13.0278C28.528 13.0278 28.1427 11.4652 28.1427 9.53831Z"
              fill="#A238FF"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_14">
            <rect width="106.66" height="30" fill="white" transform="translate(0 0.5)" />
          </clipPath>
          <clipPath id="clip1_1_14">
            <rect width="106.66" height="29.9981" fill="white" transform="translate(0 0.500931)" />
          </clipPath>
        </defs>
      </svg>
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
