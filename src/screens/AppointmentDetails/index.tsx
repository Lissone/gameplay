import React from 'react'
import { ImageBackground, View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { FlatList } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'

import BannerImg from '../../assets/banner.png'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export function AppointmentDetails() {
  const members = [
    { 
      id: '1',
      username: 'Lissone',
      avatar: 'https://github.com/Lissone.png',
      status: 'online'
    },
    { 
      id: '2',
      username: 'Rodrigo',
      avatar: 'https://github.com/rodrigorgtic.png',
      status: 'offline'
    }
  ]

  return (
    <Background>
      <Header 
        title='Detalhes' 
        action={
          <BorderlessButton>
            <Fontisto 
              name='share'
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            Lendários
          </Text>

          <Text style={styles.subTitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader 
        title='Jogadores'
        subTitle='Total 2'
      />

      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member 
            id={item.id}
            username={item.username}
            avatar={item.avatar}
            status={item.status}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon 
          title='Entrar na partida' 
        />
      </View>
    </Background>
  )
}