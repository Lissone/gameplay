import React, { ReactNode } from 'react'
import { View, Modal, ModalProps } from 'react-native'

import { Background } from '../Background'

import { styles } from './styles'

interface ModalView extends ModalProps {
  children: ReactNode
}

export function ModalView({ children, ...rest }: ModalView) {
  return (
    <Modal
      transparent
      animationType='slide'
      {...rest}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Background>
            <View style={styles.bar} />

            {children}
          </Background>
        </View>
      </View>
    </Modal>
  )
}