import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser } from '@/utils/storage';

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await ApiPostRequest.addUserData({ name, password, email });

            if (response?.token && response?.user) {
  await saveUser({ ...response.user, token: response.token });  
  router.push('/home');
} else {
  setError('Something went wrong during registration.');
}
        } catch (err) {
            console.log('Login error:', err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <View className="flex-1 justify-center px-6 bg-white">
            <Text className="text-2xl font-bold mb-6 text-center">Register</Text>

            <TextInput
                placeholder="Username"
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    setError('');
                }}
                keyboardType="default"
                className="w-full border border-gray-300 rounded-xl p-4 mb-4 text-base bg-gray-50 text-center"
            />
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
                <Text className="text-white text-lg font-bold">Register</Text>
            </TouchableOpacity>
            <View className="flex-row justify-end px-2 items-center justify-center">
                <Text className="text-xl">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text className="text-blue-500 text-xl font-semibold underline">Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
