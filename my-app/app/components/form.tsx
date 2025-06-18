import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import HeaderAction from './headeraction';
import { ApiPostRequest } from '@/data/services/ApiPostRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoteForm() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleAdd = async () => {
    try {
      const userString = await AsyncStorage.getItem('users');
      if (!userString) {
        console.log("User data not found");
        return;
      }
      const user = JSON.parse(userString); // assuming it's stored as a JSON string
      const userId = user?._id; // or 'id' depending on your backend
      console.log("user Id:", userId)

      if (!userId) {
        console.log("User ID not found");
        return;
      }

      const response = await ApiPostRequest.addPostData({
        title,
        description,
        userId
      });

      if (response) {
        console.log("Note saved successfully");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <HeaderAction title={"Notes"} />
      <View className='p-6 flex-1 justify-center'>
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Description"
          mode="outlined"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={{ marginBottom: 16 }}
        />
        <Button mode="contained" onPress={handleAdd}>
          Add Note
        </Button>
      </View>
    </>
  );
}
