import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import HeaderAction from './headeraction';

export default function NoteForm() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleAdd = () => {
    console.log({ title, description });
  };

  return (
    <><HeaderAction title={"Notes"} /><View className='p-6 flex-1 justify-center'>
          <TextInput
              label="Title"
              mode="outlined"
              value={title}
              onChangeText={setTitle}
              style={{ marginBottom: 16 }} />
          <TextInput
              label="Description"
              mode="outlined"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={{ marginBottom: 16 }} />
          <Button mode="contained" onPress={handleAdd}>
              Add Note
          </Button>
      </View></>
  );
}
