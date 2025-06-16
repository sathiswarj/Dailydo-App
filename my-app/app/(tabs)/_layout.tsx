// app/(tabs)/_layout.tsx or app/_layout.tsx depending on your setup
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIconStyle: { flex: 1 },
        tabBarStyle: { height: 80 },
        tabBarIcon: ({ color, focused }) => {
          let iconName: string;
          let title: string;
          let IconComponent = Ionicons;

          switch (route.name) {
            case 'home':
              iconName = 'home';
              title = 'Home';
              break;
            case 'updates':
              iconName = 'alert-circle-outline';
              title = 'Updates';
              break;
            case 'help':
              iconName = 'help';
              title = 'Help';
              break;
            case 'account':
              iconName = 'account';
              title = 'Account';
              IconComponent = MaterialCommunityIcons;
              break;
            default:
              return null;
          }

          return (
            <View className="w-[100px] h-[58px] items-center justify-center">
              <View
                className={`px-5 py-1.5 rounded-full 
                ${focused
                    ? 'bg-[#E0E5EC] shadow-inner'
                    : 'bg-[#E0E5EC] shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]'
                  }`}
              >
                <IconComponent
                  size={18}
                  name={iconName}
                  color={focused ? '#22c55e' : '#666666'}
                />
              </View>
              <Text className={`mt-1 ${focused ? 'font-semibold text-[#333333]' : 'font-normal text-[#666666]'}`}>
                {title}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="updates" />
      <Tabs.Screen name="help" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
