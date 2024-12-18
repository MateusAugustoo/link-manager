import { JSX } from "react"
import { Navigate } from 'react-router'
import { useUserStore } from '@/store/useUserStore'

type Props = {
  children: JSX.Element
}

export const ProtectedRouters = ({ children }: Props) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  if (!isAuthenticated) return <Navigate to={'auth/login'} />

  return children
}