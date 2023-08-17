import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserType} from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import User from '../../components/User';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text className="text-base font-semibold">Swift Chat</Text>
      ),
      headerRight: () => (
        <View className="flex flex-row items-center gap-5">
          <Icon name="chatbox-ellipses-outline" size={25} />
          <Icon name="people-outline" size={25} />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      axios
        .get(`http://localhost:8000/users/${userId}`)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.log('Error retrieving users', error);
        });
    };
    fetchUsers();
  }, []);

  console.log('Users:', users);

  return (
    <SafeAreaView>
      <View>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;