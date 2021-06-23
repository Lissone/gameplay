import React from 'react'
import { Image } from 'react-native'

import { styles } from './styles'

export function GuildIcon() {
  const uri = 'https://github.com/Lissone.png'

  return (
    <Image
      source={{ uri }}
      resizeMode='cover'
      style={styles.image}
    />
  )
}