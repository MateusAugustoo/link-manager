import { Outlet } from 'react-router'

export function AuthLayout(){
  return (
    <main
      className='flex items-center justify-center min-h-screen'
    >
      <Outlet />
    </main>
  )
}
