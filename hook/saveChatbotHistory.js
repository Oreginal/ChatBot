import * as FileSystem from 'expo-file-system';

const saveConversationToFile = async (conversationData) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}conversation_history.json`;
    const jsonString = JSON.stringify(conversationData, null, 2);
    await FileSystem.writeAsStringAsync(fileUri, jsonString);
    console.log('Conversation history saved successfully.');
  } catch (error) {
    console.error('Error saving conversation history:', error);
  }
};

export { saveConversationToFile };
