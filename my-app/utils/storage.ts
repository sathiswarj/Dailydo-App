import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(`Error saving data [${key}]
         to storage`, error)

    }
}

const USER_KEY = 'user';

export const saveUser = async (user: any) => saveToStorage(USER_KEY,user)
