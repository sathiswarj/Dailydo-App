import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import { CardItem } from '../types';
import Clock from '@/app/components/Clock'
import { ApiGetRequest } from '@/data/services/ApiGetRequest'; // <-- Add this import (adjust the path if needed)
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true); // 👈 Add loading state


  const handleFetchUser = async () => {
    try {
      setLoading(true);

      const user = await AsyncStorage.getItem("users");
      if (!user) {
        console.log("User Id not found");
        setLoading(false);
        return;
      }

      const userString = JSON.parse(user);
      const userId = userString?._id;

      // 👇 response is likely already parsed JSON
      const result = await ApiGetRequest.getAllNotesPerId({ userId });

      // ✅ Use result directly
      if (!Array.isArray(result.data)) {
        console.error("Invalid API response format:", result);
        setLoading(false);
        return;
      }

      const formattedData = result.data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        createdAt: new Date(item.createdAt),
      }));

      setData(formattedData);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    handleFetchUser();
  }, []);
  const renderItem = ({ item }: { item: CardItem }) => (
    <View className="m-2 bg-white rounded-2xl shadow-md overflow-hidden mx-1 w-full">
      <View className="p-6">
        <View className='flex-row justify-between items-center'>
          <Text className="text-xl font-semibold text-gray-800">{item.title}</Text>
          <Text className='text-gray-600 mt-2  '>{item.createdAt.toLocaleDateString()}</Text>
        </View>

        <View className='flex-col'>
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
