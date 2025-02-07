import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback } from "../atoms/avatar"
import { Button } from "../atoms/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../atoms/dropdown-menu"

import { authTokenStateUseCase } from "@/lib/auth"
import { userUseCase } from "@/lib/usecases"

const UserNav = () => {
  const navigate = useNavigate()
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userUseCase.getCurrentUser()
  })

  const handleLogout = () => {
    authTokenStateUseCase.clearToken()
    navigate("/login")
  }

  const initials = user?.email.split("@")[0].slice(0, 2).toUpperCase() ?? "??"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>Tableau de bord</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")}>Profil</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Se déconnecter</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
