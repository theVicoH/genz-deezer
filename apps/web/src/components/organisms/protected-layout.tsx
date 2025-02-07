import { Outlet, Navigate } from "react-router-dom"

import { authTokenStateUseCase } from "@/lib/auth"

const ProtectedLayout = () => {
  const isAuthenticated = authTokenStateUseCase.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default ProtectedLayout
