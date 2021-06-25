import React, { useState } from 'react'
import { useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { Load } from '../../components/Load'
import { Guild } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'
import { api } from '../../services/api'

interface GuildType {
  id: string
  name: string
  icon: string | null
  owner: boolean
}

interface GuildsProps {
  handleGuildSelect: (guild: GuildType) => void
}

export function Guilds({ handleGuildSelect }: GuildsProps) {
  // const guilds = [
  //   {
  //     id: '1',
  //     name: 'Lendários',
  //     icon: 'image.png',
  //     owner: true
  //   },
  //   {
  //     id: '2',
  //     name: 'Épicos',
  //     icon: null,
  //     owner: true
  //   }
  // ]
  const [guilds, setGuilds] = useState<GuildType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuilds()
  }, [])

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds')

    setGuilds(response.data)
    
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      {
        loading
        ?
        <Load />
        :
        <FlatList 
          data={guilds}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Guild 
              data={item}
              onPress={() => handleGuildSelect(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListHeaderComponent={() => <ListDivider />}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.guilds}
        />
      }
    </View>
  )
}