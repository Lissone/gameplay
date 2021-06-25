import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useState ,
  useEffect
} from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'
import { COLLECTION_USERS, COLLECTION_APPOINTMENTS } from '../configs/database'

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
    access_token?: string
    token_type?: string
    error?:string
  }
}

interface AuthContextType {
  user: User
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

const { REDIRECT_URI } = process.env
const { SCOPE } = process.env
const { RESPONSE_TYPE } = process.env
const { CLIENT_ID} = process.env
const { CDN_IMAGE } = process.env

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUserStorageData()
  }, [])

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS)

    if (storage) {
      const userLogged = JSON.parse(storage) as User

      api.defaults.headers.authorization = `Bearer ${userLogged.token}`

      setUser(userLogged)
    }
  }

  async function signIn() {
    try {
      setLoading(true)

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      
      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `${params.token_type} ${params.access_token}`

        const userInfo = await api.get('/users/@me')

        const firstName = userInfo.data.username.split(' ')[0]
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))

        setUser(userData)
      }

    } catch(err) {
      throw new Error(err)
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    setUser({} as User)

    await AsyncStorage.removeItem(COLLECTION_USERS)
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        signIn,
        signOut
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