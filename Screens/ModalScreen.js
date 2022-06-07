import { View, Text,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native'
import React , {useState} from 'react'
import {useNavigation} from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames'
import useAuth from '../hooks/useAuth';
import {setDoc,doc,serverTimestamp } from "@firebase/firestore";
import {db} from "../firebase";


const ModalScreen = () => {
  const {user}=useAuth();
  const navigation=useNavigation();
  const [image,setImage]= useState(null);
  const [job,setJob] = useState(null);
  const [age,setAge] = useState(null);

  const incompleteForm =!image || !job ||!age

 


  const updateUserProfile = () => {
    setDoc(doc(db,'users',user.uid),{
      id:user.uid,
      displayName: user.displayName,
      photoURL:image,
      job:job,
      age:age,
      timestamp: serverTimestamp(),
    })
     .then(()=>{
      navigation.navigate('Home')
    }).catch(err =>alert(err.message))

  }
  return (
   <View style={[tw `flex-1 items-center pt-1`]}>
     <Image
     style={[tw `h-20 w-full`]}
     resizeMode="contain"
     source={{uri :"https://links.papareact.com/2pf"}}
     />

     <Text style ={[tw`text-xl text-gray-500 p-2 font-bold`]}>
       Welcome {user.displayName}
     </Text>
     <Text style= {[tw`text-center p-4 font-bold text-red-400`]}>
      Step 1: The profile picture
      </Text>

      <TextInput
      value={image}
      onChangeText={text =>setImage(text)} 
      style={[tw`text-center text-xl pb-2`]}
      placeholder="Enter a Profile Pic URL"/>


<Text style= {[tw`text-center p-4 font-bold text-red-400`]}>
      Step 2: The Job 
      </Text>

      <TextInput 
      value={job}
      onChangeText={text =>setJob(text)} 
      style={[tw`text-center text-xl pb-2`]}
      placeholder="Enter a occupation"/>




<Text style= {[tw`text-center p-4 font-bold text-red-400`]}>
      Step 3: The Age
      </Text>

      <TextInput 
      value={age}
      onChangeText={text =>setAge(text)} 
      style={[tw`text-center text-xl pb-2`]}
      placeholder="Enter a your age"
      keyboardType='numeric'
      maxLength={2}
      />

      <TouchableOpacity 
      disabled={incompleteForm}
      style={
        [
          tw`w-64 p-3 rounded-xl absolute bottom-10`,
      incompleteForm ? tw `bg-gray-400`:tw`bg-red-400`
        ]}

        onPress={updateUserProfile}
      >
        <Text style ={[tw `text-center text-white text-xl`]}>
          Update profie
        </Text>
      </TouchableOpacity>
   </View>
  )
}

export default ModalScreen