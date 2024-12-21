import { UserCredential } from "firebase/auth";
import { useUserStore } from '@/store/useUserStore'

export async function handleLoginUser(userCredential: UserCredential) {
  const { uid, displayName, email, photoURL } = userCredential.user
  const store = useUserStore.getState()

  store.setUser({
    uid,
    username: displayName || null,
    email: email || '',
    photoURL: photoURL || null,
    name: displayName || null
  })

  store.isAuthenticated = true
}