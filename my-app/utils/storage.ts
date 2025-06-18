import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(`Error saving data [${key}]
         to storage`, error)

    }
}

export const removeFromStorage = async (key: string ) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(`Error removing data [${key}]
         to storage`, error)

    }
}

export const getFromStorage = async(key: string) =>{
    try {
        const value =  await AsyncStorage.getItem(key);
        if(value){
            return JSON.parse(value)
        }else{
            return null
        }
    } catch (error) {
             console.log(`Error getting data [${key}]
         to storage`, error)        
    }
}

const USER_KEY = 'users';

export const saveUser = async (user: any) => saveToStorage(USER_KEY,user)
export const getUser =  async() => getFromStorage(USER_KEY);
export const removeUser =  async() => removeFromStorage(USER_KEY);