import { Routes, Route, Navigate } from "react-router-dom"

import LoginForm from "./components/molecules/login-form"
import RegisterForm from "./components/molecules/register-form"
import AuthLayout from "./components/organisms/auth-layout"
import ProtectedLayout from "./components/organisms/protected-layout"
import Home from "./pages/home"
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
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
