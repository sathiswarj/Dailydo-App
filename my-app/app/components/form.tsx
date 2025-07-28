import { TextInput, View, Alert } from 'react-native';
import HeaderAction from './headeraction';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  Text,
} from "react-native";
import { getUser } from '@/utils/storage';

export default function NoteForm() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPriorityValue, setSelectedPriorityValue] = useState("Low");
  const [selectedStatusValue, setSelectedStatusValue] = useState("Pending");
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const handleAdd = async () => {
    if (!title || !description) {
      Alert.alert("Validation Error", "Title and Description are required.");
      return;
    }

    try {

      const response = await ApiPostRequest.addPostData({
        title,
        description,
        time,
        priority: selectedPriorityValue,
        status: selectedStatusValue,
      });

      if (response) {
        Alert.alert("Success", "Note saved successfully");
        setTitle('');
        setDescription('');
        setTime(new Date());
        setSelectedPriorityValue("Low");
        setSelectedStatusValue("Pending");
        setShowPicker(false);
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <>
      <HeaderAction title={"Notes"} />
      <View className="w-full space-y-4 gap-4 px-6 py-4">
        <TextInput
          className="w-full h-12 border border-gray-300 rounded-full px-4 text-gray-800 placeholder-gray-400 text-center"
          placeholder="Enter your task here"
          placeholderTextColor="#A0AEC0"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          className="w-full h-32 border border-gray-300 rounded-2xl px-4 py-2 text-gray-800 placeholder-gray-400"
          placeholder="Enter detailed task description"
          placeholderTextColor="#A0AEC0"
          multiline
          numberOfLines={6}
          textAlignVertical={Platform.OS === "android" ? "top" : undefined}
          value={description}
          onChangeText={setDescription}
        />

        <Pressable
          onPress={() => setShowPicker(true)}
          className="w-full h-12 bg-blue-500 rounded-full justify-center items-center"
        >
          <Text className="text-white font-semibold">Pick a Time</Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange}
          />
        )}
        <View className="w-full h-12 border border-black rounded-full justify-center">
          <Picker
            selectedValue={selectedPriorityValue}
            onValueChange={(itemValue) => setSelectedPriorityValue(itemValue)}
            style={{ height: 55, width: '100%' }}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>

        <View className="w-full h-12 border border-black rounded-full justify-center">
          <Picker
            selectedValue={selectedStatusValue}
            onValueChange={(itemValue) => setSelectedStatusValue(itemValue)}
            style={{ height: 55, width: '100%' }}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
        </View>
        <Pressable
          onPress={handleAdd}
          className="w-full h-12 bg-green-600 rounded-full justify-center items-center"
        >
          <Text className="text-white font-semibold">Save Note</Text>
        </Pressable>
      </View>
    </>
  );
}
