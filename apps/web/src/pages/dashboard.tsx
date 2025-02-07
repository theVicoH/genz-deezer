import DeezerPlayer from "@/components/organisms/deezer-player"
import UserNav from "@/components/organisms/user-nav"

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <UserNav />
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <DeezerPlayer />
      </div>
    </div>
  )
}

export default Dashboard
