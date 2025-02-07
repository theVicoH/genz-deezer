import UserNav from "@/components/organisms/user-nav"
import MusicRandomizer from "./temp"

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <UserNav />
      </div>
      {/* <MusicPlayer /> */}
      <MusicRandomizer />
    </div>
  )
}

export default Dashboard
