import { useQuery } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import type { MeQueryResponse } from "@/types/graphql"

import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import UserNav from "@/components/organisms/user-nav"
import { GET_ME } from "@/gql/graphql"

const profileSchema = z.object({
  email: z.string().email("Email invalide")
})

type ProfileFormValues = z.infer<typeof profileSchema>

const Profile = () => {
  const { data, loading } = useQuery<MeQueryResponse>(GET_ME)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: data?.me.email
    }
  })

  const onSubmit = (values: ProfileFormValues) => {
    // eslint-disable-next-line no-console
    console.log(values)
  }

  if (loading) return <div>Chargement...</div>

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <UserNav />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modifier mon profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your new email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <Button type="submit">Enregistrer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
