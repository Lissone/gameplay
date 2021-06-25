import React from 'react'
import { View, Image } from 'react-native'

import DiscordImg from '../../assets/discord.svg'

import { styles } from './styles'

interface GuildIconProps {
  guildId: string
  iconId: string | null
}

const { CDN_IMAGE } = process.env

export function GuildIcon({ guildId, iconId }: GuildIconProps) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`

  return (
    <View style={styles.container}>
      {
        iconId
        ?
        <Image
          source={{ uri }}
          resizeMode='cover'
          style={styles.image}
        />
        :
        <DiscordImg 
          width={40}
          height={40}
        />
      }
    </View>
  )
}