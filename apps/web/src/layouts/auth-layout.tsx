import { Outlet, Navigate } from "react-router-dom"

import { useAuthStore } from "@/stores/auth-store"


const AuthLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
