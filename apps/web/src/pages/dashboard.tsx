import UserNav from "@/components/organisms/user-nav"
import MusicRandomizer from "./temp"

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <UserNav />
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        <MusicRandomizer />
      </div>
    </div>
  )
}

export default Dashboard