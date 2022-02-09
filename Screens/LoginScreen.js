import { View, Text,Button } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const {signInWithGoogle,loading}=useAuth();
  return (
    <View>
      <Text>{loading ?"login to the app" : "Login to the app"}</Text>
      <Button title="login" onPress={signInWithGoogle}/>
    </View>
  );
};

export default LoginScreen;
