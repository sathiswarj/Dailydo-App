import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ title, options }: any) {
  const router = useRouter()

  const handleLogout = async() =>{
      await AsyncStorage.removeItem("users");
      router.push('/')
  }
  return (
 
      <View className="flex-row justify-between items-center space-y-4 bg-white pt-20 mb-4 px-5">
        <Text className="text-2xl font-bold text-green-700">{title}</Text>
        {options && (
          <View className="flex-row gap-5 space-x-5">
            <TouchableOpacity onPress={() => router.push({ pathname: '/components/form' })}>
              <Ionicons size={24} name="create-outline" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Feather size={24} name="more-vertical" />
            </TouchableOpacity>
          </View>
        )}
      </View>
 );
}
