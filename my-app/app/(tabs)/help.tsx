import { View, Text, Linking, TouchableOpacity } from 'react-native';

const help = () => {
  return (
    <View className="flex-1 px-6 mt-20">
      <Text className="text-xl font-bold mb-4"> Help & Support</Text>

      <Text className="text-base mb-2">Reach out via email at</Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:support@yourapp.com')}>
        <Text className="text-blue-600 underline mb-4">support@yourapp.com</Text>
      </TouchableOpacity>

      <Text className="text-base mb-2">Visit our FAQ or Documentation at</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://yourapp.com/help')}>
        <Text className="text-blue-600 underline">yourapp.com/help</Text>
      </TouchableOpacity>
    </View>
  );
};

export default help;
