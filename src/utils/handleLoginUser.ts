import { UserCredential } from "firebase/auth";
import { useUserStore } from '@/store/useUserStore'

export async function handleLoginUser(userCredential: UserCredential) {
  const { uid, displayName, email, photoURL } = userCredential.user
  const store = useUserStore.getState()
  const token = await userCredential.user.getIdToken()

  store.setUser({
    uid,
    username: displayName || null,
    email: email || '',
    photoURL: photoURL || null,
    token: token,
    displayName: displayName || null,
  })

  store.isAuthenticated = true
}