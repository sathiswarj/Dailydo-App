import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'

export default function Account() {

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="items-center">
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          className="w-40 h-40 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold mt-4">
          John Doe          </Text>
        <Text className="text-gray-500">
          johndoe@gmail.com        </Text>
      </View>
    </View>
  )
}
