import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Image1 from "../../assets/images/svg/jose-de-azpiazu-Fz4bjB8LdT4-unsplash.jpg";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Button from '../../components/Button';



const DATA = [
  {
    id: 1,
    image: Image1,
    hospital: "Black Lion ",
    phone: "0909890837",
    money: "234",
  },
 
];

const INITIAL_REGION = {
  latitude: 9.0088,
  longitude: 38.7666,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Item = ({ hospital, phone, money, image }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="shadow-sm shadow-slate-400 m-1  rounded-md mx-6"
    >
      <Image
        source={image}
        className="w-full h-52 rounded-t-md"
        resizeMode="cover"
      />
      <View className="">
        <View className="bg-green-500 w-2 h-2 rounded-full absolute right-3 top-2 animation"></View>
        <View className="p-5 flex justify-start items-start ">
          <View className="flex flex-row  items-center">
            <Entypo name="location-pin" size={26} color="#72B4BE" />
            <Text
              numberOfLines={1}
              ellipsize={"tail"}
              className="ml-3 text-gray-600"
            >
              {hospital}
            </Text>
          </View>
          <View className="flex flex-row items-center ">
            <FontAwesome name="phone" size={24} color="#72B4BE" />
            <Text className="ml-5  text-gray-600">{phone}</Text>
          </View>
          <View className="flex flex-row items-center ">
            <FontAwesome className="" name="money" size={20} color="#72B4BE" />
            <Text className="ml-4 text-gray-600">{money} ETB</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const More = () => {
  return (
    <>
      <FlatList
        data={DATA}
        
        className="pb-32  pt-4 h-0 "
        renderItem={({ item }) => (
          <Item
            hospital={item.hospital}
            phone={item.phone}
            money={item.money}
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View className="flex-[2] mx-6 mt-5">
        <MapView
          style={StyleSheet.absoluteFill}
          className=" h-80"
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
        />
      </View>
      <Button
        title={"Book Now"}
        handlePress={() => alert("Are you sure do you want to book?")}
      />
    </>
  );
}

export default More