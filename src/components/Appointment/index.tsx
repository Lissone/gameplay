import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import PlayerSvg from '../../assets/player.svg'
import CalendarSvg from '../../assets/calendar.svg'

import { categories } from '../../utils/categories'
import { GuildIcon } from '../GuildIcon'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface GuildType {
  id: string
  name: string
  icon: string | null
  owner: boolean
}

export interface AppointmentType {
  id: string
  guild: GuildType
  category: string
  date: string
  description: string
}

interface AppointmentProps extends RectButtonProps {
  data: AppointmentType
}

export function Appointment({ data, ...rest }: AppointmentProps) {
  const [category] = categories.filter(item => item.id === data.category)
  
  const { primary, on } = theme.colors
  const { owner } = data.guild

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <GuildIcon 
          guildId={data.guild.id}
          iconId={data.guild.icon}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.guild.name}
            </Text>

            <Text style={styles.category}>
              {category.title}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>
                {data.date}
              </Text>
            </View>

            <View style={styles.playerInfo}>
              <PlayerSvg fill={owner ? primary : on}/>

              <Text style={[styles.player, { color: owner ? primary : on }]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  )
}