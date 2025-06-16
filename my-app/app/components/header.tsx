import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function Header({ title, options }: any) {
  return (
 
      <View className="flex-row justify-between items-center space-y-4 bg-white pt-20 mb-4 px-5">
        <Text className="text-2xl font-bold text-green-700">{title}</Text>
        {options && (
          <View className="flex-row gap-5 space-x-5">
            <TouchableOpacity onPress={() => console.log('Create tapped')}>
              <Ionicons size={24} name="create-outline" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('More tapped')}>
              <Feather size={24} name="more-vertical" />
            </TouchableOpacity>
          </View>
        )}
      </View>
 );
}
