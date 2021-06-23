import React, { useState } from 'react'
import { View, FlatList } from 'react-native'

import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeder'
import { Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

export function Home() {
  const [category, setCategory] = useState('')

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
    }
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      <View style={styles.content}>
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
            <Appointment data={item} />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      </View>
    </View>
  )
}