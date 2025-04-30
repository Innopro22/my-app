import { icons } from '@/constants/icons';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const Profile = () => {
  return (
    <View className='bg-primary flex-1 px-10' >
      <View className='flex items-center justify-center flex-1 flex-col gap-5' >
        <Image source={icons.person} className='size-10' tintColor='#fff' />
        <Text className='text-gray-500 text-base' >Innopro22</Text>
        <Text className='text-light-200 font-normal text-sm' >This is a sample profile page.</Text>
      </View>
    </View>
  );
};

export default Profile;
