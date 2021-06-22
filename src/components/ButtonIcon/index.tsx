import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'

import DiscordImg from '../../assets/discord.png'

import { styles } from './styles'

interface ButtonIconProps {
  title: string
  activeOpacity?: number
}

export function ButtonIcon({ title, activeOpacity }: ButtonIconProps) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ?? .7}
      style={styles.container}
    >
      <View  style={styles.iconWrapper}>
        <Image 
          source={DiscordImg}
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}