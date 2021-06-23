import React from 'react'
import { View, Text } from 'react-native'

import { Avatar } from '../Avatar'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface MemberProps {
  id: string
  username: string
  avatar: string
  status: string
}

export function Member({ id, username, avatar, status }: MemberProps) {
  const { on, primary } = theme.colors
  const isOnline = status === 'online'

  return (
    <View style={styles.container}>
      <Avatar urlImage={avatar}/>

      <View>
        <Text style={styles.title}>
          {username}
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