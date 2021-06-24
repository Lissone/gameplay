import React, { createContext, ReactNode, useContext, useState } from 'react'

interface User {
  id: string
  username: string
  firstName: string
  email: string
  avatar: string
  token: string
}

interface AuthContextType {
  user: User
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  return (
    <AuthContext.Provider 
      value={{user}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}