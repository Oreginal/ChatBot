import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatBot3 from './src/chatbot';
import Login from './src/login';
import { useState, useEffect } from 'react';
import authHook from './hook/authHook';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './config/firebase';
import History from './src/history';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const user = authHook();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name='Main' options={{ tabBarVisible: false }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen name='Psycad ChatBot' component={ChatBot3} />
                <Tab.Screen name='History' component={History} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
