import { RouterProvider } from "react-router"
import { router } from "./router/router"
import { ThemeToggle } from "./components/themeToggle"
import { Toaster} from '@/components/ui/toaster'

function App() {
  return (
    <>
      <ThemeToggle />
      <div
         className='min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]'
      >
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </>
  )
}

export default App
