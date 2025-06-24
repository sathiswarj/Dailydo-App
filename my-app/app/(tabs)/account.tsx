import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store' // Adjust path as necessary

export default function Account() {
  const user = useSelector((state: RootState) => state.user)
  console.log('User data:', user)

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="items-center">
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          className="w-40 h-40 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold mt-4">
          {user.name || 'John Doe'}
        </Text>
        <Text className="text-gray-500">
          {user.email || 'johndoe@gmail.com'}
        </Text>
      </View>
    </View>
  )
}
