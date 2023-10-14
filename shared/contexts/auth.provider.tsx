"use client"

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "@firebase/auth"
import { auth } from "@/shared/config/firebase"

const AuthContext = createContext<{
  login(): Promise<void>
  logout(): Promise<void>
  currentUser: User | null
}>({ async login() {}, async logout() {}, currentUser: null })

export default function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const login = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logout = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
