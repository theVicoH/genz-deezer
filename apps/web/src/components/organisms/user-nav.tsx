import { useQueryClient } from "@tanstack/react-query"
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

import { useCurrentUser } from "@/hooks/use-current-user"
import { client } from "@/lib/repositories"
import { authTokenStateUseCase } from "@/lib/usecases"
import { PrivateRoutes, PublicRoutes } from "@/types/routes"

const UserNav = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()

  const handleLogout = () => {
    authTokenStateUseCase.clearToken()
    queryClient.clear()
    client.clearStore()

    navigate(PublicRoutes.LOGIN)
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
        <DropdownMenuItem 
          disabled={location.pathname === PrivateRoutes.HOME}
          onClick={() => navigate(PrivateRoutes.HOME)}
        >
          Home
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={location.pathname === PrivateRoutes.PROFILE}
          onClick={() => navigate(PrivateRoutes.PROFILE)}
        >
          Profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Se déconnecter</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
