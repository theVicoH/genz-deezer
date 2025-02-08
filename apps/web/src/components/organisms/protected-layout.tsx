import { Outlet, Navigate } from "react-router-dom"

import UserNav from "./user-nav"

import DeezerExtendedLogo from "@/assets/icons/logo-extended.svg"
import { authTokenStateUseCase } from "@/lib/usecases"


const ProtectedLayout = () => {
  const isAuthenticated = authTokenStateUseCase.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex items-center justify-between px-8 py-4">
          <DeezerExtendedLogo /> 
          <UserNav />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedLayout
