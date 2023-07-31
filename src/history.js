import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { FIREBASE_AUTH } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHook from '../hook/authHook';




const History = ({ navigation }) => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userId, setUserId] = useState(null);

  const  user  = authHook();

  useEffect(() => {
    setUserId(user?.uid)
    console.log('uid', userId)
  }, [])

  useEffect(() => {
    if (userId) {
      loadConversationHistory();
    }
  }, [userId]);

  useEffect(() => {
    loadConversationHistory();
  }, [conversationHistory]);

  const loadConversationHistory = async () => {
    try {
      const filename = `${userId}_conversation_history.json`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      const parsedData = JSON.parse(fileContents);
      setConversationHistory(parsedData);
    } catch (error) {
      // Handle error or consider this as the first time the user is using the app
      console.error('Error loading conversation history:', error);
    }
  };

  // Rendering each item of the conversation history
  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.userMessage}>User: {item.userMessage}</Text>
      <Text style={styles.botReply}>ChatBot: {item.botReply}</Text>
    </View>
  );

  const handleLogout = () => {
    FIREBASE_AUTH.signOut() // Call the sign out function from Firebase Auth
      .then(() => {
        // Perform any additional actions after successful logout (e.g., navigate to login screen)
        alert("Logged Out")
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <View>
      <FlatList
        data={conversationHistory}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
      />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
  },
  userMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 6,
  },
  botReply: {
    fontSize: 16,
    color: 'green',
  },
  logoutButton: {
    position: 'absolute',
    top: 5,
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default History;
