import React from 'react'
import { View, Text } from 'react-native'
import { RectButton ,RectButtonProps } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { SvgProps } from 'react-native-svg'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface CategoryProps extends RectButtonProps {
  title: string
  icon: React.FC<SvgProps>
  hasCheckBox?: boolean
  checked?: boolean
}

export function Category({ 
  title, 
  icon: Icon, 
  checked = false,
  hasCheckBox = false,
  ...rest 
}: CategoryProps) {
  const { secondary50, secondary80, secondary40, secondary70 } = theme.colors
  
  return (
    <RectButton {...rest}>
      <LinearGradient
        colors={[secondary50, secondary70]}
        style={styles.container}
      >
        <LinearGradient
          colors={[checked ? secondary80 : secondary50, secondary40]}
          style={[styles.content, { opacity: checked ? 1 : 0.4 }]}
        >
          {hasCheckBox &&
            <View style={checked ? styles.checked : styles.check}/>
          }

          <Icon 
            width={48}
            height={48}
          />

          <Text style={styles.title}>
            {title}
          </Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  )
}