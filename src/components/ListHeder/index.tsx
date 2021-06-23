import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'

interface ListHeaderProps {
  title: string
  subTitle: string
}

export function ListHeader({ title, subTitle }: ListHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subTitle}>
        {subTitle}
      </Text>
    </View>
  )
}