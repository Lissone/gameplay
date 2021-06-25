import React, { useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLLECTION_APPOINTMENTS } from '../../configs/database'

import { Load } from '../../components/Load'
import { Background } from '../../components/Background'
import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment, AppointmentType } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

export function Home() {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  
  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storageAppointments: AppointmentType[] = storage ? JSON.parse(storage) : []
    
    if (category) {
      setAppointments(storageAppointments.filter(appointment => appointment.category === category))
    } else {
      setAppointments(storageAppointments)
    }

    setLoading(false)
  }

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

      {
        loading
        ?
         <Load />
        :
        <>
          <ListHeader 
            title='Partidas agendadas'
            subTitle={`Total de ${appointments?.length}`}
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
        </>
      }
    </Background>
  )
}