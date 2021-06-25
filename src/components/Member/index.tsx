import React from 'react'
import { View, Text } from 'react-native'

import { Avatar } from '../Avatar'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export interface MemberProps {
  data: {
    id: string
    username: string
    avatar_url: string
    status: string
  }
}

export function Member({ data }: MemberProps) {
  const { on, primary } = theme.colors
  const isOnline = data.status === 'online'

  return (
    <View style={styles.container}>
      <Avatar urlImage={data.avatar_url}/>

      <View>
        <Text style={styles.title}>
          {data.username}
        </Text>

        <View style={styles.status}>
          <View 
            style={[styles.bulletStatus, { backgroundColor: isOnline ? on : primary }]}
          />

          <Text style={styles.nameStatus}>
            {isOnline ? 'Disponível' : 'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  )
}