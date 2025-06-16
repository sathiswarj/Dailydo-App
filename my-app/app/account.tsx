import { useRouter } from 'expo-router';
import {useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function account() {
const [name,setName] = useState("");
const [phoneNo, setPhoneNo] =  useState("");
const router = useRouter()
 
const handleSubmit= () =>{
      const isValidNumber = /^\+\d{1,3}\s?\d{10}$/.test(phoneNo)

    console.log(`${name} & ${isValidNumber}`)
    router.push({ pathname: "/home", params: { phoneNo } })
}
    return (
        <View className='flex-1 justify-center items-center px-5  '>
            <Text className='text-2xl font-bold mt-6 mb-4'>Account setup</Text>
            <TextInput placeholder='Enter your name' className='px-6 py-4 border border-gray-500 rounded-full w-full mb-3 text-center text-lg' value={name} onChangeText={setName}/>
            <TextInput placeholder='Enter your phone no' className='px-6 py-4 border border-gray-500 rounded-full w-full mb-3 text-center text-lg' value={phoneNo} onChangeText={setPhoneNo} keyboardType='phone-pad'/>
            <TouchableOpacity className='bg-green-500 w-full px-6 py-4 rounded-full ' onPress={handleSubmit}>
                <Text className='text-white text-center font-bold text-lg'>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}