import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ChatBot3 from './src/chatbot';
import Login from './src/login';
import { useState, useEffect } from 'react';
import authHook from './hook/authHook';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/firebase';



const Stack = createStackNavigator();

export default function App() {

  const  user  = authHook();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {user ? (<Stack.Screen name='ChatBot3' component={ChatBot3} />) : (<Stack.Screen name='Login' component={Login} />)}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
