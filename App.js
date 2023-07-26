import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatBot3 from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatBot3/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
