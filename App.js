import React from 'react';
import StackNavigator from './StackNavigator';
import {LogBox,I18nManager} from "react-native";
 I18nManager.allowRTL(false)
LogBox.ignoreAllLogs(); //ignore log notification by message
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';



export default function App() {

  return (
   <NavigationContainer>
      {/* {Hoc higher order component} */}
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
   </NavigationContainer>
  );
}

