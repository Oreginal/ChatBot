import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';


const saveConversationHistory = async (newHistory) => {
  try {
    const jsonHistory = JSON.stringify(newHistory);
    await AsyncStorage.setItem('conversationHistory', jsonHistory);
    console.log('Conversation history saved successfully.');
  } catch (error) {
    console.error('Error saving conversation history:', error);
  }
};

export { saveConversationHistory };
