import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native-paper';
import HeaderAction from './headeraction';
import { ApiGetRequest } from '@/data/services/ApiGetRequest';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';
 import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function PostPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPriorityValue, setSelectedPriorityValue] = useState('Low');
  const [selectedStatusValue, setSelectedStatusValue] = useState('Pending');

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await ApiGetRequest.getNotePerId({ noteId: id });
        if (res?.data) {
          setNote(res.data);
        } else {
          console.log('Note not found.');
        }
      } catch (err) {
        console.error('Failed to fetch note:', err);
        Alert.alert('Error loading note');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title ?? '');
      setDescription(note.description ?? '');
      setTime(note.time ? new Date(note.time) : new Date());
      setSelectedPriorityValue(note.priority ?? 'Low');
      setSelectedStatusValue(note.status ?? 'Pending');
    }
  }, [note]);

  const handleTimeChange = (_event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
      setShowPicker(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !description) {
      Alert.alert("Validation Error", "Title and Description are required.");
      return;
    }

    try {

      const response = await ApiPostRequest.updatePostData({
        noteId: id,
        title,
        description,
        time,
        priority: selectedPriorityValue,
        status: selectedStatusValue,
      });

      if (response) {
        Alert.alert("Success", "Note saved successfully");
        router.push('/(tabs)/home');
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  if (loading) return <Text className="text-center mt-4">Loading...</Text>;

  return (
    <>
      <HeaderAction title="Post" />
      <View className="p-6 flex-1 justify-center">
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          label="Title"
          mode="outlined"
        />
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          label="Description"
          multiline
          mode="outlined"
          style={{ minHeight: 100, marginTop: 10 }}
        />

        <Text className="mt-2 text-gray-500">
          {note?.createdAt
            ? new Date(note.createdAt).toLocaleDateString()
            : 'No Date'}
        </Text>

        <Pressable
          onPress={() => setShowPicker(true)}
          className="w-full h-12 bg-blue-500 rounded-full justify-center items-center mt-4"
        >
          <Text className="text-white font-semibold">Pick a Time</Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}

       <View className='flex-row items-center justify-between mt-4 w-full'>
   <View className="w-[48%] h-12 border border-black rounded-full justify-center">
    <Picker
      selectedValue={selectedPriorityValue}
      onValueChange={(itemValue) => setSelectedPriorityValue(itemValue)}
      style={{ height: 54, width: '100%' }}
    >
      <Picker.Item label="Low" value="Low" />
      <Picker.Item label="Medium" value="Medium" />
      <Picker.Item label="High" value="High" />
    </Picker>
  </View>

   <View className="w-[48%] h-12 border border-black rounded-full justify-center">
    <Picker
      selectedValue={selectedStatusValue}
      onValueChange={(itemValue) => setSelectedStatusValue(itemValue)}
      style={{ height: 54, width: '100%' }}
    >
      <Picker.Item label="Pending" value="Pending" />
      <Picker.Item label="In Progress" value="In Progress" />
      <Picker.Item label="Completed" value="Completed" />
    </Picker>
  </View>
</View>


        <TouchableOpacity
          disabled={!title.trim()}
          className={`w-full rounded-full p-5 mt-4 ${title.trim() ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          onPress={handleUpdate}
        >
          <Text className="text-xl text-white text-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
