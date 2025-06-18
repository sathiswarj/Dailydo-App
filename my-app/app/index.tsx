import { getFromStorage } from '@/utils/storage';
import { usePathname, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

export default function index() {
    const router = useRouter();
    const pathname = usePathname();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const redirectUser = async () => {
            try {
                const user = await getFromStorage('users');
                if (user && pathname !== '/home') {
                    router.push('/home')
                }
                else {
                    setCheckingAuth(false)
                }
            } catch (error) {
                console.log('Error:', error)
                setCheckingAuth(false)
            }
        }

        redirectUser();
    }, [])

    if (checkingAuth) {
        return (
            <View className='flex-1 justify-center items-center bg-white'>
                <ActivityIndicator size='large' color="blue" />
            </View>
        )
    }

    return (
        <View className='flex-1 justify-center items-center px-5 '>
            <Text className='text-2xl font-bold '>Todo App</Text>
            <Text className='text-2xl py-3'>To Set Your Goals</Text>
            <TouchableOpacity className='bg-green-500 w-full rounded-full px-6 py-4 mt-2' onPress={() => router.push('/login')}>
                <Text className='text-xl text-center font-bold text-white'>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}