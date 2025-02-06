import { Outlet, Navigate } from "react-router-dom"

import { useAuthStore } from "@/stores/auth-store"

const ProtectedLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

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
