import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './Screens/ChatScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ModalScreen from './Screens/ModalScreen';
import useAuth from './hooks/useAuth';
import MatchedScreen from './Screens/MatchedScreen';
import MessageScreen from './Screens/MessageScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {user}= useAuth();
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}>
      {user ? (
        <>
      <Stack.Group>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen}/>
      <Stack.Screen name="Message" component={MessageScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation:'modal'}}>
      <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation:'transparentModal'}}>
      <Stack.Screen name="Match" component={MatchedScreen} />
      </Stack.Group>



    
     </>
      ) : (
     <Stack.Screen name="Login" component={LoginScreen} />

     )}

    </Stack.Navigator>
  );
};

export default StackNavigator;
