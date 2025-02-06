import { Routes, Route, Navigate } from "react-router-dom"

import LoginForm from "./features/login-form"
import RegisterForm from "./features/register-form"
import AuthLayout from "./layouts/auth-layout"
import ProtectedLayout from "./layouts/protected-layout"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
