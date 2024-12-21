import { Outlet } from "react-router";
import { useUserStore } from '@/store/useUserStore'
import { Button } from "@/components/ui/button";

export function DashboardLayout() {

  const email = useUserStore((state) => state.user?.email)
  const logout = useUserStore((state) => state.logout)

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