import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleInputText from "../../../components/GoogleInputText";
import Map from "../../../components/Map";
import RideCard from "../../../components/RideCard";
import { icons, images } from "../../../constants";
import rides from "../../../data/rides";
import { useLocationStore } from "../../../store";

export default function Home() {
  const { user } = useUser();
  const isLoading = false;
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [hasPremission, setHasPermission] = useState(false);

  const handleSignOut = () => {
    // Implement sign-out logic here
  };
  const handleDestinationSearch = () => {
    // Implement destination search logic here
  };
  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync();

      const adress = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      });
      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${adress[0].name} , ${adress[0].region}`,
      });
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={rides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!isLoading ? (
              <>
                <Image source={images.noResult} className="h-40 w-40" />
                <Text className="text-lg text-gray-500">
                  No rides available
                </Text>
              </>
            ) : (
              <Text className="text-lg text-gray-500">Loading...</Text>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-lg font-bold">
                Welcome{"  "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
                👋🏻
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="flex flex-row items-center gap-x-1"
              >
                <Image source={icons.out} className="h-5 w-5" />
              </TouchableOpacity>
            </View>
            <GoogleInputText
              handlePress={handleDestinationSearch}
              icon={icons.search}
              ContainerStyle="bg-white shadow-md shadow-neutral-300 rounded-full"
            />

            <>
              <Text className="text-xl font-bold mt-5 mb-3">
                You&apos;re current location
              </Text>

              <View className="w-full h-[300px] overflow-hidden rounded-2xl">
                <Map />
              </View>
            </>
            <Text className="text-lg font-bold mt-5 mb-3">Recent Rides</Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
