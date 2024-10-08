import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import "@expo/metro-runtime";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const DATA = [
  {
    id: 1,
    date: "2 June 2024",
    time: "11:38",
    startTime: "11:21",
    endTime: "12:30",
    from: "Megenagna",
    to: "Mexico",
    isCancelled: "",
  },
  {
    id: 2,
    date: "23 Jan 2024",
    time: "01:08",
    startTime: "11:21",
    endTime: "12:30",
    from: "Megenagna",
    to: "Yerer",
    isCancelled: "Cancelled",
  },
  {
    id: 3,
    date: "1 Dec 2023",
    time: "07:42",
    startTime: "11:21",
    endTime: "12:30",
    from: "Megenagna",
    to: "Dembel",
  },
  {
    id: 4,
    date: "11 Nov 2023",
    time: "07:42",
    startTime: "11:21",
    endTime: "12:30",
    from: "Megenagna",
    to: "Shiro Meda",
    isCancelled: "Cancelled",
  },
  {
    id: 5,
    date: "29 Sep 2023",
    time: "07:42",
    startTime: "11:21",
    endTime: "12:30",
    from: "Megenagna",
    to: "Stadium",
  },
];

const HistoryList = ({
  date,
  time,
  startTime,
  endTime,
  from,
  to,
  isCancelled,
}) => {
  return (
    <View onPress={() => router.push("More")} className=" mx-4 p-6 rounded-md shadow-sm shadow-slate-500 mb-5">
      <View className="flex justify-between flex-row">
        <View className="flex flex-row gap-3 ">
          <Text className="text-[#3E4958] font-bold">{date}</Text>
          <Text className="text-[#3E4958] font-bold">{time}</Text>
        </View>
        <Text className="text-[#EB5757] font-bold">{isCancelled}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#5e17eb",
          marginVertical: 10,
        }}
      />
      <View className="flex flex-row">
        <View className=" flex flex-col justify-between">
          <Text className="text-gray-600 ">{startTime}</Text>
          <Text className="text-gray-600 ">{endTime}</Text>
        </View>

        <View className="flex-[] flex items-center gap-y-1">
          <View className="bg-[#5e17eb] w-2 h-2 rounded-full " />
          <View className="w-[2px] h-11  bg-gray-500" />
          <MaterialCommunityIcons
            name="arrow-down-drop-circle-outline"
            size={14}
            color="#6b7280"
          />
        </View>
        <View className="flex-[10]  flex flex-col justify-between">
          <Text className="text-gray-600 font-semibold">{from}</Text>
          <Text className="text-gray-600 ">{to}</Text>
        </View>
      </View>
    </View>
  );
};

const History = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryList
            date={item.date}
            time={item.time}
            startTime={item.startTime}
            endTime={item.endTime}
            from={item.from}
            to={item.to}
            isCancelled={item.isCancelled}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default History;
