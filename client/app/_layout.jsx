import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import "@expo/metro-runtime";
import Logo from "../assets/images/svg/logo.png";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Button = () => {
  <TouchableOpacity>
    <FontAwesome name="user-circle-o" size={24} color="black" />
  </TouchableOpacity>;
};

function LogoTitle() {
  return <Image className="w-14 h-14 mb-1 ml-3" source={Logo} />;
}

const RootLayout = () => {
  const bellHandle = () => {
    ToastAndroid.show(
      "There is no notification yet!",
      ToastAndroid.SHORT
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/* <Stack.Screen name="splashscreen" options={{ headerShown: false }} /> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ title: "" }} />
        <Stack.Screen name="detail" options={{ title: "" }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerBackVisible: false,
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <TouchableOpacity>
                <FontAwesome
                  name="bell-o"
                  size={24}
                  color="#5e17eb"
                  onPress={bellHandle}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
