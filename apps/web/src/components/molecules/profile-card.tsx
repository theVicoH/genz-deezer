import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { userUseCase } from "@/lib/usecases.ts"

const profileSchema = z.object({
  email: z.string().email("Email invalide")
})

type ProfileFormValues = z.infer<typeof profileSchema>

const ProfileCard = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userUseCase.getCurrentUser()
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      email: user?.email ?? ""
    }
  })

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values)
  }

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email
      })
    }
  }, [user, form])

  useEffect(() => {
    console.log(user)
  }, [user])

  if (isLoading) return <div>Chargement...</div>

  return (
    <div className="flex items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Modifier mon profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your new email" {...form.register("email")} />
              {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <Button type="submit">Enregistrer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCard
