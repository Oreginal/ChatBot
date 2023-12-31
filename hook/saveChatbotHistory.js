// import * as FileSystem from 'expo-file-system';

// const saveConversationToFile = async (conversationData) => {
//   try {
//     const fileUri = `${FileSystem.documentDirectory}conversation_history.json`;
//     const jsonString = JSON.stringify(conversationData, null, 2);
//     await FileSystem.writeAsStringAsync(fileUri, jsonString);
//     console.log('Conversation history saved successfully.');
//   } catch (error) {
//     console.error('Error saving conversation history:', error);
//   }
// };

// export { saveConversationToFile };

import AsyncStorage from '@react-native-async-storage/async-storage';

const saveConversationToFile = async (conversationData, id) => {
  try {
    const user = id; 
    const storageKey = `conversationHistory:${user}`;
    
    let existingData = await AsyncStorage.getItem(storageKey);
    if (!existingData) {
      existingData = [];
    } else {
      existingData = JSON.parse(existingData);
    }
    
    const updatedData = [...existingData, ...conversationData];
    const jsonString = JSON.stringify(updatedData, null, 2);
    
    await AsyncStorage.setItem(storageKey, jsonString);
    console.log('Conversation history saved successfully.');
  } catch (error) {
    console.error('Error saving conversation history:', error);
  }
};

export { saveConversationToFile };


