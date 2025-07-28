import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';
 import { saveUser } from '@/utils/storage';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await ApiPostRequest.login({ email, password });

      if (response?.token) {
        await saveUser({
          _id: response.user._id,
          email: response.user.email,
          token: response.token,
        }); router.push('/home');
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
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError('');
        }}
        keyboardType="email-address"
        className="w-full border border-gray-300 rounded-xl p-4 mb-4 text-base bg-gray-50 text-center"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
        secureTextEntry={true}
        keyboardType="default"
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
      <View className="flex-row justify-center mt-4">
        <Text className="text-xl text-right">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text className="text-xl text-blue-500 underline">Register</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}
