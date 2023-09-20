import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import authHook from '../hook/authHook';
import { useEffect } from 'react';
import { saveConversationToFile } from '../hook/saveChatbotHistory';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Image } from 'react-native';





const ChatBot3 = () => {

    const [messages, setMessages] = useState([])
    const [conversationHistory, setConversationHistory] = useState([]);
    const [id, setId] = useState('');
    const [count, setCount] = useState(0);
    const API_Key = process.env.OPENAI_API_KEY;
    const chatBotImage = require('../images/bot.png');
    const  user  = authHook();
    
    useEffect(() => {
        saveHistory(); 
      }, [conversationHistory]);

      useEffect(() => {
        console.log(user)
      }, []);
      



      const saveHistory = () => {
        saveConversationToFile(conversationHistory, id);
      };

      const renderBubble = (props) => {
        return (
          <View>
            {props.position === 'left' && (
              <Image
                source={chatBotImage}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            )}
            <Bubble {...props} />
          </View>
        );
      };
      
    
    const handleSend = async (newMessages = []) => {
        try {
            const userMessage = newMessages[0];

            setMessages(previousMessage => GiftedChat.append(previousMessage, userMessage))
            const messageText = userMessage.text.toLowerCase();
            const greatings = 
            ['hello', 'hi', 'good morning', 'good afternoon', 'hey', 'good evening']
            const endings = 
            ['no thank you', 'bye', 'see you later', 'good night', 'till next time', 'thanks', 'thank you', 'thank']

            if (greatings.some(greating => messageText.includes(greating))){
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "Hello " + user?.email + " I am your Psycad ChatBot how are you feeling today",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Psycad ChatBot'

                    }
                };
                setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));
                
                const botReply = "Hello " + user?.email + " I am your Psycad ChatBot how are you feeling today";
                
                setConversationHistory((prevHistory) => [
                  ...prevHistory,
                  { userMessage: messageText, botReply },
                ]);
              console.log('new', conversationHistory)
              setId(user.uid)

                return;
            }
            

            if (endings.some(ending => messageText.includes(ending))){
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "It was a pleasure talking with you. Please feel free to come back anytime I am always available to help. Just say 'Hi'. ",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Psycad ChatBot'

                    }
                };
                setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));

                const botReply = "It was a pleasure talking with you. Please feel free to come back anytime I am always available to help. Just say 'Hi'. ";
                setConversationHistory((prevHistory) => [
                  ...prevHistory,
                  { userMessage: messageText, botReply },
                ]);
              console.log('new', conversationHistory)
              setId(user.uid)

                return;
            }

            if (count == 3) {
              const botMessage = {
                _id: new Date().getTime() + 1,
                text: "Lets take the first step together towards emotional well-being - book an appointment with our skilled psychologist today. If you would like to please type in 'Yes' or 'No' to continue using the ChatBot",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Psycad ChatBot'

                }
            };

            setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));
            setCount(count + 1);
            console.warn(count);
            const botReply = "Lets take the first step together towards emotional well-being - book an appointment with our skilled psychologist today.";

            setConversationHistory((prevHistory) => [
              ...prevHistory,
              { userMessage: messageText, botReply },
            ]);
          console.log('new', conversationHistory)
          setId(user.uid)
   
            return;
            }

            if (messageText == 'yes'){
              //redirect to bookings page
              console.log("redirect")
              Alert.alert(
                'Redirect',
                'You are getting redirected to the bookings tab.',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
                { cancelable: false }
              );
              return;
            } else if(messageText == 'no'){
              // const botReply = "No problem, lets carry on with our conversation";

              const botMessage = {
                _id: new Date().getTime() + 1,
                text: "No problem, lets carry on with our conversation",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Psycad ChatBot'

                }
            };

            setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));
            setCount(count + 1);
            console.warn(count);
            const botReply = "No problem, lets carry on with our conversation";

            setConversationHistory((prevHistory) => [
              ...prevHistory,
              { userMessage: messageText, botReply },
            ]);
   
            return;
            }

            const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                // prompt: `Get me advice for ${messageText} and explain like you are a psychologist speaking to a patient. Please refer to the patient using their username ${user.email} and summerize infomation into 50 to 70 words`,
                //content: "Explain things like you are a psychologist speaking to a patient",
                prompt: `Check if the user requires emotional support in ${messageText} and if so, please give the user advice on how to deal with their problem. If not please refuse to answer the question`,
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

            setCount(count + 1);
            console.warn(count);
            const text = response.data.choices[0].text.trim();
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: text + "\n\nI hope my advice is helpful. Is there anything else I can help you with?",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Psycad ChatBot'
                }
            }
            const botReply = response.data.choices[0].text.trim()
            setMessages(previousMessage => GiftedChat.append(previousMessage, botMessage));

            setConversationHistory((prevHistory) => [
                ...prevHistory,
                { userMessage: messageText, botReply },
              ]);
            console.log('new', conversationHistory)
            setId(user.uid)


            
        } catch (error) {
            console.log(error)
        }
    };

    return(
        <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => handleSend(newMessages)}
          user={{ _id: 1 }}
          renderBubble={renderBubble} 
        />
      </View>
    )
}

export default ChatBot3