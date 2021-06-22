import React from 'react'
import { 
  View,
  StatusBar,
  Text, 
  Image
} from 'react-native'

import IllustrationImg from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon'

import { styles } from './styles'

export function SignIn() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Image 
        source={IllustrationImg}
        resizeMode='stretch'
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se {`\n`}
          e organize suas {`\n`}
          jogatinas
        </Text>

        <Text style={styles.subTitle}>
          Crie grupos para jogar seus games {`\n`}
          favoritos com seus amigos
        </Text>

        <ButtonIcon 
          title='Entrar com Discord'
        />
      </View>
    </View>
  )
}