import { View, Text } from 'react-native'
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebase';


const authHook = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
       //r console.log('user', user);
        setUser(user);
      });
    } catch (error) {
      // Handle the error here
      console.error('Error in onAuthStateChanged:', error);
    }
  }, []);



  return (
    user
  )
}

export default authHook