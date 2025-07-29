import { View, Text, ScrollView } from 'react-native';

const Updates = () => {
  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-4">🚀 What's New</Text>

      <View className="mb-4">
        <Text className="text-base font-semibold">🕒 Improved Time Tracking</Text>
        <Text className="text-sm text-gray-700">
          Easily log task start and end times with our updated intuitive time picker. Track your work more accurately!
        </Text>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold">📌 Priority Tag Enhancements</Text>
        <Text className="text-sm text-gray-700">
          Set task priority with new color-coded labels: Low, Medium, or High — now with better visibility across all devices.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold">🔄 Real-Time Status Sync</Text>
        <Text className="text-sm text-gray-700">
          Task status updates instantly sync across devices. Seamlessly switch between “Pending,” “In Progress,” and “Completed.”
        </Text>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold">📱 Cross-Platform Optimization</Text>
        <Text className="text-sm text-gray-700">
          Full support for Android & iOS ensures a smooth and consistent experience no matter your device.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold">🗂️ Smart Sorting Options</Text>
        <Text className="text-sm text-gray-700">
          Sort your tasks by time, priority, or status with a single tap — stay organized your way.
        </Text>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold">🌙 Dark Mode Ready</Text>
        <Text className="text-sm text-gray-700">
          All new features look great in both light and dark mode. Your eyes will thank you during late-night work sessions.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Updates;
