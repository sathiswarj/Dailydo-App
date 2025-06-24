import { Slot } from 'expo-router';
import { View } from 'react-native';
import './global.css';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

export default function Layout() {
  return (
    <View className='flex-1'>
      <Provider store={store}>
        <Slot />
      </Provider>
    </View>
  );
}
