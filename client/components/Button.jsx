import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import "@expo/metro-runtime";
import { router } from 'expo-router';


const Button = ({ title, handlePress, style }) => {
  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={`h-20 mb-28 mt-6 justify-center items-center ${style}`}
      >
        <Text className="text-lg bg-[#5e17eb] text-white px-32 py-4 rounded-2xl">
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Button