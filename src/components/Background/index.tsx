import React, { ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface BackgroundProps {
  children: ReactNode
}

export function Background({ children }: BackgroundProps) {
  const { secondary80, secondary100 } = theme.colors

  return (
    <LinearGradient
      colors={[secondary80, secondary100]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  )
}