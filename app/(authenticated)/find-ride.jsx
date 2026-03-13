import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import OSMSearchBar from "../../components/OsmSearchBar";
import RideLayout from "../../components/RideLayout";
import { icons } from "../../constants";
import { useLocationStore } from "../../store";

export default function FindRide() {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();

  const handleSwapLocations = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const tempAddress = userAddress;
    const tempDestination = destinationAddress;
    // Swap would need lat/lng too — for now just visual swap
    if (tempAddress && tempDestination) {
      setUserLocation({
        address: tempDestination,
        latitude: 0,
        longitude: 0,
      });
      setDestinationLocation({
        address: tempAddress,
        latitude: 0,
        longitude: 0,
      });
    }
  };

  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View className="my-3 relative">
        <View className="flex-row items-center mb-3">
          <View className="w-3 h-3 rounded-full bg-green-500 mr-3" />
          <Text
            className="text-sm text-gray-500 uppercase tracking-wide"
            style={{ fontFamily: "Jakarta-SemiBold" }}
          >
            Pickup
          </Text>
        </View>
        <OSMSearchBar
          icon={icons.target}
          initalLocation={userAddress}
          onSelect={(location) => {
            setUserLocation(location);
          }}
        />
      </View>

      {/* Swap Button */}
      <View className="items-center -my-3 z-10">
        <TouchableOpacity
          onPress={handleSwapLocations}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Image
            source={icons.arrowDown}
            className="w-4 h-4"
            tintColor="#0286ff"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
          <Image
            source={icons.arrowDown}
            className="w-4 h-4 -mt-1"
            tintColor="#0286ff"
          />
        </TouchableOpacity>
      </View>

      <View className="my-3">
        <View className="flex-row items-center mb-3">
          <View className="w-3 h-3 rounded-full bg-red-500 mr-3" />
          <Text
            className="text-sm text-gray-500 uppercase tracking-wide"
            style={{ fontFamily: "Jakarta-SemiBold" }}
          >
            Destination
          </Text>
        </View>
        <OSMSearchBar
          icon={icons.map}
          initalLocation={destinationAddress}
          onSelect={(location) => {
            setDestinationLocation(location);
          }}
        />
      </View>

      <CustomButton
        title="Find Now"
        className="mt-5"
        onPress={() => router.push("./confirm-ride")}
        onPressIn={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }
      />
    </RideLayout>
  );
}
