import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
  
          if (token) {
            navigation.navigate("HomeScreen")
          } else {
            //token not found, show the login screen itself
            navigation.navigate('LoginScreen');
          }
        } catch (error) {
          console.log('Error', error);
        }
      };
      checkLoginStatus()
    }, []);
  
    const handleLogin = () => {
      const user = {
        email: email,
        password: password,
      };
      axios
        .post('http://localhost:8000/login', user)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem('authToken', token);
  
          navigation.navigate('HomeScreen');
        })
        .catch(error => {
          console.log('Login Error', error);
          Alert.alert('Login Error', 'Invalid email or password');
        });
    };
  
    return (
      <View className="flex-1 items-center bg-white p-10">
        <KeyboardAvoidingView>
          <View className=" mt-[96px] items-center justify-center">
            <Text className="text-[#4A55A2] text-[17px] font-semibold">
              Sign In
            </Text>
            <Text className="font-semibold text-[17px] mt-[15px]">
              Sign In to Your Account
            </Text>
          </View>
          <View className="mt-[50px]">
            <View>
              <Text className="text-base font-semibold text-[#808080] mb-1">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                className="border-b border-b-[#808080] w-[300]"
                placeholderTextColor={'black'}
                placeholder="enter your email"
              />
            </View>
            <View className="mt-2">
              <Text className="text-base font-semibold text-[#808080] mb-1">
                Password
              </Text>
              <TextInput
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                className="border-b border-b-[#808080] w-[300]"
                placeholderTextColor={'black'}
                placeholder="enter your password"
              />
            </View>
            <TouchableOpacity
              className="w-[200] bg-[#4A55A2] p-[14px] mt-[50px] ml-auto mr-auto rounded-md"
              onPress={handleLogin}>
              <Text className="text-white text-base mx-auto font-semibold">
                Login
              </Text>
            </TouchableOpacity>
            <Pressable className="mt-4" onPress={() => navigation.navigate("RegisterScreen")}>
              <Text className="mx-auto text-[#808080] text-sm">
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  export default LoginScreen;