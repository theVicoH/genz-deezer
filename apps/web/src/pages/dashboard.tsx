import { useQuery } from "@apollo/client"

import type { MeQueryResponse } from "@/types/graphql"

import MusicPlayer from "@/components/molecules/music-player"
import UserNav from "@/components/organisms/user-nav"
import { GET_ME } from "@/gql/graphql"

const Dashboard = () => {
  const { loading } = useQuery<MeQueryResponse>(GET_ME)

  if (loading) return <div>Chargement...</div>

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <UserNav />
      </div>
      <MusicPlayer />
    </div>
  )
}

export default Dashboard
