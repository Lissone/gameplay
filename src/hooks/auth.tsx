import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useState 
} from 'react'
import * as AuthSession from 'expo-auth-session'

import { api } from '../services/api'
import { 
  REDIRECT_URI,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  CDN_IMAGE
} from '../configs'

interface User {
  id: string
  username: string
  firstName: string
  email: string
  avatar: string
  token: string
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string
    token_type: string
  }
}

interface AuthContextType {
  user: User
  loading: boolean
  signIn: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  async function signIn() {
    try {
      setLoading(true)

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      
      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success') {
        api.defaults.headers.authorization = `${params.token_type} ${params.access_token}`

        const userInfo = await api.get('/users/@me')

        const firstName = userInfo.data.username.split(' ')[0]
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token
        })

        setLoading(false)
      } else {
        setLoading(false)
      }

    } catch(err) {
      throw new Error(err)
    }
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}