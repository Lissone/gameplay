import React from 'react'
import { View, FlatList } from 'react-native'

import { Guild } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

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
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '2',
      name: 'Épicos',
      icon: null,
      owner: true
    }
  ]

  return (
    <View style={styles.container}>
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
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.guilds}
      />
    </View>
  )
}