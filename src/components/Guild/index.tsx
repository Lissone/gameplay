import React from 'react'
import { 
  TouchableOpacity, 
  TouchableOpacityProps,
  View, 
  Text 
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { GuildIcon } from '../GuildIcon'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface GuildType {
  id: string
  name: string
  icon: string | null
  owner: boolean
}

interface GuildProps extends TouchableOpacityProps {
  data: GuildType
}

export function Guild({ data, ...rest }: GuildProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      {...rest}
    >
      <GuildIcon />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>

          <Text style={styles.type}>
            {data.owner ? 'Administrador' : 'Convidado'}
          </Text>
        </View>
      </View>

      <Feather 
        name='chevron-right'
        color={theme.colors.heading}
        size={24}
      />
    </TouchableOpacity>
  )
}