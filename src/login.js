import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from 'react';
import { FIREBASE_AUTH } from '../config/firebase';

const Login = () => {
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH

    const [form, setForm] = useState({
        email: '',
        password: '',
      });

      const signIn = async() => {

        try {
            const response = await signInWithEmailAndPassword(auth, form.email, form.password);
            console.log(response);
          } catch (error) {
              console.log(error);
              alert('Failed: '+ error.message)
          }
      }

      const signUp = async() => {

        try {
            const response = await createUserWithEmailAndPassword(auth, form.email, form.password);
            console.log(response);
            alert('User successfully created')
          } catch (error) {
              console.log(error);
              alert('Failed: '+ error.message)
          }
      }


  return (
<View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <View style={styles.formAction}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Login', {category: 'holistic-focus'})}
              >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
          //style={styles.category}
          onPress={()=>signIn()}
          >
                <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
          </TouchableOpacity>
          </View>

          <TouchableOpacity
          //style={styles.category}
          onPress={()=>signUp()}
          >
                <View style={styles.btn}>
                <Text style={styles.btnText}>Create Account</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      padding: 24,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    header: {
      marginVertical: 36,
    },
    form: {
      marginBottom: 24,
    },
    formAction: {
      marginVertical: 24,
    },
    formFooter: {
      fontSize: 15,
      fontWeight: '500',
      color: '#222',
      textAlign: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1d1d1d',
      marginBottom: 6,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#929292',
      textAlign: 'center',
    },
    input: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 17,
      fontWeight: '600',
      color: '#222',
      marginBottom: 8,
    },
    inputControl: {
      height: 44,
      backgroundColor: '#f1f5f9',
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: '#222',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      backgroundColor: '#007aff',
      borderColor: '#007aff',
    },
    btnText: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: '600',
      color: '#fff',
    },
    category:{
      width: 150,
      height: 150,
      margin: 10,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  });