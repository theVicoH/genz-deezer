import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useCurrentUser } from "@/hooks/use-current-user"

const profileSchema = z.object({
  email: z.string().email("Email invalide")
})

type ProfileFormValues = z.infer<typeof profileSchema>

const ProfileForm = () => {
  const { data: user, isLoading } = useCurrentUser()

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
    <div className="flex flex-col justify-center gap-8">
      <h2 className="text-foreground text-2xl font-bold" >Modifier mon profil</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-96 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your new email" {...form.register("email")} />
          {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
        </div>
        <Button size="lg" type="submit" className="w-full">Enregistrer</Button>
      </form>
    </div>
  )
}

export default ProfileForm
