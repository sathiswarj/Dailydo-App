// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'users';

export const saveToStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`✅ Saved [${key}] to AsyncStorage`, value);
  } catch (error) {
    console.log(`❌ Error saving [${key}] to AsyncStorage`, error);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
          console.log(`✅ Retrieved [${key}] from AsyncStorage`, value);    

    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log(`❌ Error getting [${key}] from AsyncStorage`, error);
    return null;
  }
};

export const removeFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`❌ Error removing [${key}] from AsyncStorage`, error);
  }
};

// ✅ Final wrappers for user
export const saveUser = async (user: any) => saveToStorage(USER_KEY, user);
export const getUser = async () => getFromStorage(USER_KEY);
export const removeUser = async () => removeFromStorage(USER_KEY);
