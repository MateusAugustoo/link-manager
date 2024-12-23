import { IUser } from '@/interfaces/IUser';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';


interface IUserStore {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: IUser) =>
        set({
          user: {
            uid: user.uid,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token: user.token,
          },
          isAuthenticated: true,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    } as PersistOptions<IUserStore>
  )
);

export { useUserStore };
