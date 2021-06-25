import React, { useState } from 'react'
import { 
  View, 
  Text,
  Platform,
  ScrollView, 
  KeyboardAvoidingView
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

import { COLLECTION_APPOINTMENTS } from '../../configs/database'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { CategorySelect } from '../../components/CategorySelect'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from '../Guilds'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

interface GuildType {
  id: string
  name: string
  icon: string | null
  owner: boolean
}

export function AppointmentCreate() {
  const navigation = useNavigation()
  
  const [openGuildModal, setOpenGuildModal] = useState(false)

  const [category, setCategory] = useState('')
  const [guild, setGuild] = useState({} as GuildType)
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  function handleOpenGuildModal() {
    setOpenGuildModal(true)
  }

  function handleCloseModal() {
    setOpenGuildModal(false)
  }

  function handleGuildSelect(guildSelected: GuildType) {
    setGuild(guildSelected)
    setOpenGuildModal(false)
  }

  async function handleSaveForm() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} ás ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

    const appointments = storage ? JSON.parse(storage) : []

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    )

    navigation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header 
            title='Agendar partida' 
          />

          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuildModal}>
              <View style={styles.select}>
                { 
                  guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                  : <View style={styles.image}/>
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name='chevron-right'
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput 
                    maxLength={2}
                    onChangeText={setDay}
                  />

                  <Text style={styles.divider}>
                    /
                  </Text>

                  <SmallInput 
                    maxLength={2}
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput 
                    maxLength={2}
                    onChangeText={setHour}
                  />

                  <Text style={styles.divider}>
                    :
                  </Text>

                  <SmallInput 
                    maxLength={2}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>
            
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button 
                title='Agendar'
                onPress={handleSaveForm}
              />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView 
        visible={openGuildModal}
        closeModal={handleCloseModal}
      >
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}