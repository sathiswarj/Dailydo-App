import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function index() {
    const router = useRouter()

    return (
    <View className='flex-1 justify-center items-center px-5 '>
         <Text className='text-2xl font-bold '>Todo App</Text>
        <Text className='text-2xl py-3'>To Set Your Goals</Text>
        <TouchableOpacity className='bg-green-500 w-full rounded-full px-6 py-4 mt-2' onPress={()=> router.push('/account')}>
            <Text className='text-base text-center font-semibold'>Get Started</Text>
        </TouchableOpacity>
     </View>
  )
}