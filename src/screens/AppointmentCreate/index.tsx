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
  const [category, setCategory] = useState('')
  const [openGuildModal, setOpenGuildModal] = useState(false)
  const [guild, setGuild] = useState({} as GuildType)

  function handleOpenGuildModal() {
    setOpenGuildModal(true)
  }

  function handleGuildSelect(guildSelected: GuildType) {
    setGuild(guildSelected)
    setOpenGuildModal(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header 
            title='Agendar partida' 
          />

          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={setCategory}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuildModal}>
              <View style={styles.select}>
                { 
                  guild.icon 
                  ? <GuildIcon /> 
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
                <Text style={styles.label}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />

                  <Text style={styles.divider}>
                    /
                  </Text>

                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={styles.label}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />

                  <Text style={styles.divider}>
                    :
                  </Text>

                  <SmallInput maxLength={2} />
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
            />

            <View style={styles.footer}>
              <Button title='Agendar'/>
            </View>
          </View>
        </Background>
      </ScrollView>

      <ModalView visible={openGuildModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}