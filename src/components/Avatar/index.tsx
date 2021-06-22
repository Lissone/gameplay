import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface AvatarProps {
  urlImage: string
}

export function Avatar({ urlImage }: AvatarProps) {
  const { secondary50, secondary70 } = theme.colors

  return (
    <LinearGradient
      colors={[secondary50, secondary70]}
      style={styles.container}
    >
      <Image 
        source={{ uri: urlImage }}
        style={styles.avatar}
      />
    </LinearGradient>
  )
}