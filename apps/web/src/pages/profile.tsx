import ProfileCard from "@/components/molecules/profile-card"
import UserNav from "@/components/organisms/user-nav"


const Profile = () => {

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <UserNav />
      </div>

      <ProfileCard />
    </div>
  )
}

export default Profile
