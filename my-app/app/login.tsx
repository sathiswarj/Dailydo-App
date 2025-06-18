import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [emailId, setEmailId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!emailId || !phoneNo) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await ApiPostRequest.addUserData({ phoneNo, emailId });

      if (response && response._id) {
        await AsyncStorage.setItem('users', JSON.stringify(response));
        console.log('User logged in:', response);
        router.push('/home');
      } else {
        setError('No user found with the provided credentials.');
      }
    } catch (err) {
      console.log('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Login</Text>

      <TextInput
        placeholder="Email Id"
        value={emailId}
        onChangeText={(text) => {
          setEmailId(text);
          setError('');
        }}
        keyboardType="email-address"
        className="w-full border border-gray-300 rounded-xl p-4 mb-4 text-base bg-gray-50 text-center"
      />

      <TextInput
        placeholder="Phone number"
        value={phoneNo}
        onChangeText={(text) => {
          setPhoneNo(text);
          setError('');
        }}
        keyboardType="phone-pad"
        className="w-full border border-gray-300 rounded-xl p-4 mb-4 text-base bg-gray-50 text-center"
      />

      {error ? (
        <Text className="text-red-600 text-center mb-4">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 rounded-full py-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
