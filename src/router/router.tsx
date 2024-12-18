import { AuthLayout } from '@/app/auth/layout'
import { LoginPage } from '@/app/auth/login'
import { RegisterPage } from '@/app/auth/register'
import { DashboardLayout } from '@/app/dash/layout'
import { ProtectedRouters } from '@/components/protectedRouters'
import { createBrowserRouter, RouteObject } from 'react-router'

const routers: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
    ]
  },
  {
    path: '/',
    element: <ProtectedRouters children={
      <DashboardLayout />
    }/>,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>
      },
      {
        path: 'preview',
        element: <h1>Preview</h1>
      }
    ]
  }

]

export const router = createBrowserRouter(routers)