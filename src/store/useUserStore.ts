import { create } from 'zustand'

type User = {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
}

type UserStore = {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

export { useUserStore }