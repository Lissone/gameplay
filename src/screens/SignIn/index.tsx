import React from 'react'
import { 
  View,
  Text, 
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IllustrationImg from '../../assets/illustration.png'

import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'

import { styles } from './styles'

export function SignIn() {
  const navigation = useNavigation()

  function handleSignIn() {
    navigation.navigate('Home')
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

          <ButtonIcon 
            title='Entrar com Discord'
            onPress={handleSignIn}
          />
        </View>
      </View>
    </Background>
  )
}