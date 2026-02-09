import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../../../components/Map";
import OSMSearchBar from "../../../components/OsmSearchBar";
import RideCard from "../../../components/RideCard";
import { icons, images } from "../../../constants";
import { useFetch } from "../../../lib/fetch";
import { useLocationStore } from "../../../store";

export default function Home() {
  const { user } = useUser();
  const isLoading = false;
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const mapRef = useRef(null);
  const { signOut } = useAuth();
  const { data: rides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  const moveToLocation = (location) => {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("(auth)/signup");
  };
  const handleDestinationSearch = (location) => {
    setDestinationLocation(location);
    moveToLocation(location);
    router.push("/(authenticated)/find-ride");
  };
  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
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
  }, [setUserLocation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-general-500 flex-1">
        <FlatList
          data={rides?.slice(0, 5) || []}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <RideCard ride={item} />
              </View>
            </TouchableWithoutFeedback>
          )}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
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
                <View>
                  <Text className="text-sm font-medium text-gray-500">
                    Good to see you 👋
                  </Text>
                  <Text className="text-2xl font-bold text-gray-900 mt-1">
                    {user?.firstName ||
                      user?.emailAddresses[0].emailAddress.split("@")[0]}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleSignOut}
                  className="w-10 h-10 items-center justify-center rounded-full bg-white"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <Image
                    source={icons.out}
                    className="h-5 w-5"
                    tintColor="#6b7280"
                  />
                </TouchableOpacity>
              </View>

              <OSMSearchBar
                onSelect={handleDestinationSearch}
                icon={icons.search}
                ContainerStyle="bg-white shadow-md shadow-neutral-300 rounded-full py-1.5"
                textInputBackgroundColor="white"
              />
              <>
                <Text className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                  Your current location
                </Text>

                <View
                  className="w-full h-[300px] overflow-hidden rounded-2xl"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Map />
                </View>
              </>
              <Text className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                Recent Rides
              </Text>
            </>
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
