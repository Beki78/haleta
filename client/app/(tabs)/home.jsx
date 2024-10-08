import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DATA from "../../lib/data";
import * as Location from "expo-location";
import Filter from "../../components/Filter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NEMT from "./toptabs/Nonemergency";
import homeamb from "../../assets/images/svg/homeamb.jpg";
import { getDistance } from "geolib";

const { width } = Dimensions.get("window");

const Item = ({ hospital, phone, money, image, handlePress }) => (
  <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.5}
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: "#fff",
      margin: 8,
      flex: 1,
      borderRadius: 8,
      overflow: "hidden",
    }}
  >
    <Image
      source={image}
      style={{
        width: "100%",
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
      resizeMode="cover"
    />
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="location-pin" size={24} color="#ff914d" />
        <Text numberOfLines={1} style={{ paddingRight: 10, color: "#666" }}>
          {hospital}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <FontAwesome name="phone" size={20} color="#ff914d" />
        <Text style={{ marginLeft: 10, color: "#666" }}>{phone}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <FontAwesome name="money" size={18} color="#ff914d" />
        <Text style={{ marginLeft: 10, color: "#666" }}>{money} ETB</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(DATA);
  const [isNearbyActive, setIsNearbyActive] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Please grant location permissions."
        );
        setLoading(false);
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        Alert.alert("Error", "Unable to fetch location.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(DATA);
    } else {
      const filtered = DATA.filter((item) =>
        item.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  const handlePress = (item) => {
    router.push({
      pathname: `/detail/More`,
      params: { item: JSON.stringify(item) },
    });
  };

  const lowcostHandle = () => {
    const filteredAndSorted = DATA.filter((item) => item.money < 2000).sort(
      (a, b) => parseInt(a.money, 10) - parseInt(b.money, 10)
    );
    setFilteredData(filteredAndSorted);
    setIsNearbyActive(true);
    setIsButtonActive("Low Cost");
  };

  const nearByHandle = () => {
    if (!location) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services to use this feature."
      );
      return;
    }

    const hospitalsWithDistance = DATA.map((hospital) => {
      if (
        typeof hospital.latitude !== "number" ||
        typeof hospital.longitude !== "number"
      ) {
        return null;
      }

      const distanceInKm =
        getDistance(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: hospital.latitude,
            longitude: hospital.longitude,
          }
        ) / 1000;

      return {
        ...hospital,
        distance: distanceInKm.toFixed(2),
      };
    }).filter((hospital) => hospital !== null);

    if (hospitalsWithDistance.length === 0) {
      Alert.alert("No Hospitals", "No valid hospitals found.");
      return;
    }

    const sortedHospitals = hospitalsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    setFilteredData(sortedHospitals);
    setIsNearbyActive(true);
    setIsButtonActive("Near by");
  };

  const allHandle = () => {
    setFilteredData(DATA);
    setIsNearbyActive(false);
    setIsButtonActive("All");
  };

  const renderItem = ({ item }) => {
    if (item.placeholder) {
      return <View style={{ flex: 1, margin: 8 }} />;
    }

    return (
      <Item
        hospital={item.hospital}
        phone={item.phone}
        money={item.money}
        image={item.image}
        handlePress={() => handlePress(item)}
      />
    );
  };

  const dataToRender = [...filteredData];
  if (dataToRender.length % 2 !== 0) {
    dataToRender.push({ id: "placeholder", placeholder: true });
  }

  if (loading) {
    return <ActivityIndicator size="large"  color="#5e17eb" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 12 }}>
        <Image
          className="w-full mt-3 h-48 mb-4"
          resizeMode="cover"
          source={homeamb}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              borderColor: "#5e17eb",
              borderWidth: 1,
              flex: 1,
              flexDirection: "row",
              padding: 8,
              borderRadius: 8,
            }}
          >
            <FontAwesome
              name="search"
              size={24}
              color="#5e17eb"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ flex: 1 }}
              placeholder="Search ambulance"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Filter
            title="All"
            buttonHandle={allHandle}
            activeStyle={isButtonActive === "All"}
          />
          <Filter
            title="Low Cost"
            buttonHandle={lowcostHandle}
            activeStyle={isButtonActive === "Low Cost"}
          />
          <Filter
            title="Near by"
            buttonHandle={nearByHandle}
            activeStyle={isButtonActive === "Near by"}
          />
        </ScrollView>
      </View>
      <FlatList
        data={dataToRender}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
        style={{ flex: 1, marginTop: 8 }}
      />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
  screenOptions={{
    tabBarIndicatorStyle: { backgroundColor: "#5e17eb" },
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: { backgroundColor: "#fff", elevation: 0, shadowOpacity: 0 },
    tabBarContentContainerStyle: { marginTop: 0 }
  }}
>

        <Tab.Screen name="Emergency" component={HomeScreen} />
        <Tab.Screen name="NEMT" component={NEMT} />
      </Tab.Navigator>
  );
}
