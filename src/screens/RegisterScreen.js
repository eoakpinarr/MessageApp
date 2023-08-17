import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import axios from 'axios';
  
  const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
  
    const handleRegister = () => {
      const user = {
        name: name,
        email: email,
        password: password,
        image: image,
      };
  
      //send a post request to the beckend API to register the user
      axios
        .post('http://localhost:8000/register', user)
        .then((response) => {
          console.log(response);
          Alert.alert(
            'Registration succesfulll',
            'You have been registered succesfully',
          );
          setName('');
          setEmail('');
          setPassword('');
          setImage('');
        })
        .catch(error => {
          console.log('Registration Failed', error);
          Alert.alert('Registration Error', 'An error occured while registering');
        });
    };
  
    return (
      <View className="flex-1 items-center bg-white p-10">
        <KeyboardAvoidingView>
          <View className=" mt-[96px] items-center justify-center">
            <Text className="text-[#4A55A2] text-[17px] font-semibold">
              Register
            </Text>
            <Text className="font-semibold text-[17px] mt-[15px]">
              Register to Your Account
            </Text>
          </View>
          <View className="mt-[50px]">
            <View>
              <Text className="text-base font-semibold text-[#808080] mb-1">
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                className="border-b border-b-[#808080] w-[300]"
                placeholderTextColor={'black'}
                placeholder="enter your name"
              />
            </View>
            <View className="mt-2">
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
            <View className="mt-2">
              <Text className="text-base font-semibold text-[#808080] mb-1">
                Image
              </Text>
              <TextInput
                value={image}
                onChangeText={text => setImage(text)}
                className="border-b border-b-[#808080] w-[300]"
                placeholderTextColor={'black'}
                placeholder="enter your image"
              />
            </View>
            <TouchableOpacity
              className="w-[200] bg-[#4A55A2] p-[14px] mt-[50px] ml-auto mr-auto rounded-md"
              onPress={handleRegister}>
              <Text className="text-white text-base mx-auto font-semibold">
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={() => navigation.goBack()}>
              <Text className="mx-auto text-[#808080] text-sm">
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  export default RegisterScreen;