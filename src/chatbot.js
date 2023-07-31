import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import wretch from 'wretch'
import authHook from '../hook/authHook';
import { useEffect } from 'react';
import saveConversationToFile from '../hook/chatbotHistory';



const ChatBot3 = () => {

    const [messages, setMessages] = useState([])
    const [conversationHistory, setConversationHistory] = useState([]);
    const API_Key = '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'
    const  user  = authHook();
    
    // useEffect(() => {
    //     console.log(user)
    // },[])
    const handleSend = async (newMessages = []) => {
        try {
            const userMessage = newMessages[0];

            setMessages(previousMessage => GiftedChat.append(previousMessage, userMessage))
            const messageText = userMessage.text.toLowerCase();
            const keywords = 
            ['sad', 'anxiety', 'depression', 'depressed', 'depressing','angry', 'anger',
            'bullying', 'bullied', 'exhausted', 'not well', 'not okay', 'feeling down', 'anxious',
            'mad', 'down' ];
            const greatings = 
            ['hello', 'hi', 'good morning', 'good afternoon', 'hey', 'good evening']
            const endings = 
            ['no thank you', 'bye', 'see you later', 'good night', 'till next time']

            if (greatings.some(greating => messageText.includes(greating))){
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "Hello " + user?.email + " I am your Psycad ChatBot how are you feeling today",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Moxie Bot'

                    }
                };
                setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));
                return;
            }
            

            if (endings.some(ending => messageText.includes(ending))){
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "It was a pleasure talking with you. Please feel free to come back anytime I am always available to help. Just say 'Hi'. ",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Moxie Bot'

                    }
                };
                setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));
                return;
            }

            if(!keywords.some(keyword => messageText.includes(keyword))){
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "Hello I am your Psycad ChatBot, I am your psychology bot. Please ask me about anything concerning your mental health.",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Moxie Bot'

                    }
                };
                setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));
                return;
            }

            const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                prompt: `Get me advice for ${messageText} and explain like you are a psychologist speaking to a patient. Please refer to the patient using their username ${user.email}`,
                //content: "Explain things like you are a psychologist speaking to a patient",
                max_tokens: 1200,
                temperature: 0.2,
                n:1,
            }, {
                headers: {
                    "Authorization": " Bearer " + API_Key,
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
//const response = await wretch('https://api.openai.com/v1/models/text-davinci-003')

            const text = response.data.choices[0].text.trim();
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: text + "\n\nI hope my advice is helpful. Is there anything else I can help you with?",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Moxie Bot'
                }
            }

            setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));

            setConversationHistory((prevHistory) => [
                ...prevHistory,
                { userMessage: messageText, text },
              ]);
            console.log('new', conversationHistory)
                saveHistory = () => {
             
                saveConversationToFile(conversationHistory)
              };
            
        } catch (error) {
            console.log(error)
        }
    };

    return(
    <View style ={{flex: 1}}>
        <View
        style={{backgroundColor: '#F5F5F5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 40,
        marginBottom: 5}}>
            <Text style={{fontSize:32}}>Psycad ChatBot</Text>
        </View>
        <GiftedChat
         messages={messages}
          onSend={newMessages => handleSend(newMessages)}
          user={{
          _id: 1,
         }}
    />
    </View>
    )
}

export default ChatBot3