import React, { useState, useEffect } from 'react'
import { ImageBackground, View, Text, Alert } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { FlatList } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'

import BannerImg from '../../assets/banner.png'

import { api } from '../../services/api'
import { AppointmentType } from '../../components/Appointment'
import { MemberProps } from '../../components/Member'

import { Load } from '../../components/Load'
import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface GuildWidgetType {
  id: string
  name: string
  instant_invite: string
  members: MemberProps[]
}

interface AppointmentDetailsParams {
  appointmentSelected: AppointmentType
}

export function AppointmentDetails() {
  const route = useRoute()
  const { appointmentSelected } = route.params as AppointmentDetailsParams

  const [loading, setLoading] = useState(true)
  const [guildWidget, setGuildWidget] = useState<GuildWidgetType>({} as GuildWidgetType)

  useEffect(() => {
    fetchGuildWidget()
  }, [])

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`guilds/${appointmentSelected.guild.id}/widget.json`)

      setGuildWidget(response.data)
    } catch (err) {
      Alert.alert(err)
    } finally {
      setLoading(false)
    }
  }

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
            {appointmentSelected.guild.name}
          </Text>

          <Text style={styles.subTitle}>
            {appointmentSelected.description}
          </Text>
        </View>
      </ImageBackground>
      
      {
        loading
        ? <Load />
        :
        <>
          <ListHeader 
            title='Jogadores'
            subTitle={`Total ${guildWidget.members.length}`}
          />

          <FlatList 
            data={guildWidget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
        </>
      }

      <View style={styles.footer}>
        <ButtonIcon 
          title='Entrar na partida' 
        />
      </View>
    </Background>
  )
}