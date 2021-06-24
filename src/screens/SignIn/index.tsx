import React from 'react'
import { 
  View,
  Text, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'

import IllustrationImg from '../../assets/illustration.png'

import { useAuth } from '../../hooks/auth'

import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export function SignIn() {
  const { loading, signIn } = useAuth()

  async function handleSignIn() {
    try {
      await signIn()
    } catch (err) {
      Alert.alert(err)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image 
          source={IllustrationImg}
          resizeMode='stretch'
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subTitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>

          {
            loading 
            ?
              <ActivityIndicator color={theme.colors.primary}/>
            :
              <ButtonIcon 
                title='Entrar com Discord'
                onPress={handleSignIn}
              />
          }
        </View>
      </View>
    </Background>
  )
}