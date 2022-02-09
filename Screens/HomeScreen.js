import { View, Text,Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/UseAuth';

const HomeScreen = () => {
    const navigation =useNavigation();
    const {logout} = useAuth();
  return (
    <View>
      <Text>i am home Scren</Text>
      <Button title="go to chat"
       onPress={() => {navigation.navigate("Chat")}}/>

       <Button title ="logout" onPress={logout}/>
    </View>
  );
};

export default HomeScreen;
