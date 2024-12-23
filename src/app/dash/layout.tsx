import { Outlet } from "react-router";
import { useUserStore } from '@/store/useUserStore'
import { Button } from "@/components/ui/button";
import { signOut } from 'firebase/auth'
import { auth } from "@/firebase/firebase.conf";

export function DashboardLayout() {

  const email = useUserStore((state) => state.user?.email)
  const logout = () => {
    const store = useUserStore.getState()
    signOut(auth)
    store.clearUser()
  }

  return (
    <main>
      <header>
        <h1>
          Dashboard
          {email && <span> - {email}</span>}
        </h1>
      </header>
      <Outlet />

      <Button
        onClick={logout}
        className="fixed bottom-4 right-4"
      >
        Logout
      </Button>
    </main>
  )
}