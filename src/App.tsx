import { RouterProvider } from "react-router"
import { router } from "./router/router"
import { ThemeToggle } from "./components/themeToggle"
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeToggle />
      <div
        className='min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]'
      >
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </QueryClientProvider>

  )
}

export default App
