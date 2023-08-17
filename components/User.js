import {View, Text, SafeAreaView, Pressable, Image} from 'react-native';
import React from 'react';

const User = ({item}) => {
  return (
    <Pressable className = "flex flex-row items-center p-2">
      <View>
        <Image
          source={{uri: item.image}}
          className="w-[50] h-[50] rounded-full"
        />
      </View>
      <Text className="mx-auto">{item.name}</Text>
    </Pressable>
  );
};

export default User;