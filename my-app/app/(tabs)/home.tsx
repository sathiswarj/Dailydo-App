import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import Header from '@/app/components/header';
import { CardItem } from './types';
import Clock from '@/app/components/Clock'

export default function Home() {
  const data: CardItem[] = [
    {
      id: '1',
      title: 'Card Title',
      description:
        'This is a short description inside the card. You can put anything here like info, CTA, etc.',
      createdAt: new Date("2025-06-17 14:42")
    },

  ];

  const renderItem = ({ item }: { item: CardItem }) => (
    <View className="m-2 bg-white rounded-2xl shadow-md overflow-hidden mx-1 w-full">
      <View className="p-6">
        <View className='flex-row justify-between items-center'>
          <Text className="text-xl font-semibold text-gray-800">{item.title}</Text>
          <Text className='text-gray-600 mt-2  '>{item.createdAt.toLocaleDateString()}</Text>
        </View>

        <View className='flex-col justify-between items-center'>
          <Text className="text-gray-600 mt-2">{item.description.length ? item.description.substring(0, 50) + "..." : item.description}</Text>
          <TouchableOpacity className="mt-4 px-4 py-2 bg-blue-600 rounded w-full">
            <Text className="text-white text-center">Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Header title="Dailydo" options={true} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
      />
    </>
  );
}
