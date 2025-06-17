import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';

export default function Account() {
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await ApiPostRequest.addUserData({ userName, phoneNo });
      if (response) {
        router.push({ pathname: '/home', params: { phoneNo } });
      }
    } catch (error) {
      console.log('Error in saving user data:', error);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Account Setup</Text>

      <TextInput
        placeholder="Your Name"
        value={userName}
        onChangeText={setUserName}
        className="w-full border border-gray-300 rounded-xl p-4 mb-6 text-base bg-gray-50 text-center"
      />

      <TextInput
        placeholder="Phone Number"
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType="phone-pad"
        className="w-full border border-gray-300 rounded-xl p-4 mb-8 text-base bg-gray-50 text-center"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 rounded-full py-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
