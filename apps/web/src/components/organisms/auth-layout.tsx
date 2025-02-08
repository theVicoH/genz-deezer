import { Outlet, Navigate } from "react-router-dom"

import DeezerLogo from "@/assets/icons/logo.svg"
import { authTokenStateUseCase } from "@/lib/usecases"

const AuthLayout = () => {
  const isAuthenticated = authTokenStateUseCase.isAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex w-full max-w-md flex-col items-center space-y-6 p-8">
        <DeezerLogo />
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
