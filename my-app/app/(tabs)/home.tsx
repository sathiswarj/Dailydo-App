import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import { CardItem } from '../types';
import { ApiGetRequest } from '@/data/services/ApiGetRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true); // 👈 Add loading state
  const router = useRouter()


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

      const result = await ApiGetRequest.getAllNotesPerId({ userId });

      if (!Array.isArray(result.data)) {
        console.error("Invalid API response format:", result);
        setLoading(false);
        return;
      }

      const formattedData = result.data.map((item: any) => ({
        id: item._id,
        userId: item.userId,
        title: item.title,
        description: item.description,
        createdAt: new Date(item.createdAt),
        status: item.status,
        priority: item.priority,
      }));


      setData(formattedData);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Pending':
        return { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
      case 'Completed':
        return { bgColor: 'bg-green-100', textColor: 'text-green-800' };
      case 'In Progress':
        return { bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      default:
        return { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'Pending':
        return { bg_Color: 'bg-yellow-100', text_Color: 'text-yellow-800' };
      case 'Completed':
        return { bg_Color: 'bg-green-100', text_Color: 'text-green-800' };
      case 'In Progress':
        return { bg_Color: 'bg-blue-100', text_Color: 'text-blue-800' };
      default:
        return { bg_Color: 'bg-gray-100', text_Color: 'text-gray-800' };
    }
  };


  useEffect(() => {
    handleFetchUser();
  }, []);
  const renderItem = ({ item }: { item: CardItem }) => {
    const { bgColor, textColor } = getStatusStyles(item.status);
    const { bg_Color, text_Color } = getPriorityStyles(item.status);

    return (
      <View className="m-2 bg-white rounded-2xl shadow-md overflow-hidden mx-1 w-full">
        <View className="p-6 space-y-4">
          <View className='flex-row justify-between items-center '>
            <View className='flex-col  space-y-4'>
              <Text className="text-lg font-semibold">{item.title}</Text>
            
                <Text className={`${textColor} text-sm items-center`}>⦿ {item.status}</Text>
           
            </View>
            <View className='flex-row items-center space-x-2'>
              <Text className="text-gray-500 text-sm">{item.createdAt.toLocaleDateString()}</Text>
              <View className={`px-2 py-1 rounded ${bg_Color}`}>
                <Text className={`${text_Color} text-sm`}>{item.priority}</Text>
              </View>
            </View>
          </View>

          <Text className="text-gray-600 mt-2">
            {item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description}
          </Text>

          <TouchableOpacity
            className="mt-4 px-4 py-2 bg-blue-600 rounded w-full"
            onPress={() => {
              // dispatch(setActiveNote(item)); // Uncomment when ready
              router.push({ pathname: '/components/PostPage', params: { id: item.id } });
            }}
          >
            <Text className="text-white text-center">Edit Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


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
