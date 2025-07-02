import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';

import HeaderAction from './headeraction';
import { ApiGetRequest } from '@/data/services/ApiGetRequest';
  

export default function PostPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
 
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 

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
    }
  }, [note]);
 

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      <HeaderAction title="Post" />
      <View className="p-6 flex-1 justify-center">
        <TextInput
          value={title}
          onChangeText={(text)=>setTitle(text)}
          label="Title"
          mode="outlined"
        />
        <TextInput
          value={description}
          onChangeText={(text)=>setDescription(text)}
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

        <TouchableOpacity
          disabled={!title.trim()}
          className={`w-full rounded-full p-5 mt-4 ${
            title.trim() ? 'bg-purple-500' : 'bg-gray-300'
          }`}
         >
          <Text className="text-xl text-white text-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
