import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

type HeaderActionProps = {
  title: string;
};

export default function HeaderAction({ title }: HeaderActionProps) {
    const router = useRouter();
  return (
    <View className='bg-white mt-10'>
      <View className='flex-row  p-5 bg-gray-200 mb-4'>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name='arrow-back' size={24} />
        </TouchableOpacity>
        <Text className='ml-5 text-xl font-bold'>{title}</Text>
      </View>
    </View>
  )
}