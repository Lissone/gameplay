import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Background } from '../../components/Background'
import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

export function Home() {
  const [category, setCategory] = useState('')

  const navigation = useNavigation()

  const appointments = [
    { 
      id: '1', 
      guild: {
        id: '1',
        name: 'Lendários',
        owner: true
      },
      category: '1',
      date: '22/06 ás 20:40h',
      description: 'É hoje que vamos chegar no challenger sem perder uma partida da md10'
    },
    { 
      id: '2', 
      guild: {
        id: '1',
        name: 'Lendários',
        owner: true
      },
      category: '1',
      date: '22/06 ás 20:40h',
      description: 'É hoje que vamos chegar no challenger sem perder uma partida da md10'
    },
    { 
      id: '3', 
      guild: {
        id: '1',
        name: 'Lendários',
        owner: true
      },
      category: '1',
      date: '22/06 ás 20:40h',
      description: 'É hoje que vamos chegar no challenger sem perder uma partida da md10'
    },
    { 
      id: '4', 
      guild: {
        id: '1',
        name: 'Lendários',
        owner: true
      },
      category: '1',
      date: '22/06 ás 20:40h',
      description: 'É hoje que vamos chegar no challenger sem perder uma partida da md10'
    },
    { 
      id: '5', 
      guild: {
        id: '1',
        name: 'Lendários',
        owner: true
      },
      category: '1',
      date: '22/06 ás 20:40h',
      description: 'É hoje que vamos chegar no challenger sem perder uma partida da md10'
    },
    { 
      id: '6', 
      guild: {
        id: '1',
        name: 'Lendários',
        owner: true
      },
      category: '1',
      date: '22/06 ás 20:40h',
      description: 'É hoje que vamos chegar no challenger sem perder uma partida da md10'
    }
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
        hasCheckBox
      />

      <ListHeader 
        title='Partidas agendadas'
        subTitle='Total de 6'
      />

      <FlatList 
        data={appointments}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.matches}
        renderItem={({ item }) => (
          <Appointment 
            data={item} 
            onPress={handleAppointmentDetails} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        ItemSeparatorComponent={() => <ListDivider />}
      />
    </Background>
  )
}