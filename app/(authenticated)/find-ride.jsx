import { router } from "expo-router";
import { Text, View } from "react-native";
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
  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="text-base font-JakartaSemiBold text-gray-700 mb-3">
          From
        </Text>
        <OSMSearchBar
          icon={icons.target}
          initalLocation={userAddress}
          ContainerStyle="bg-gray-50 border border-gray-200"
          textInputBackgroundColor="transparent"
          onSelect={(location) => {
            setUserLocation(location);
          }}
        />
      </View>

      <View className="my-3">
        <Text className="text-base font-JakartaSemiBold text-gray-700 mb-3">
          To
        </Text>
        <OSMSearchBar
          icon={icons.map}
          initalLocation={destinationAddress}
          ContainerStyle="bg-gray-50 border border-gray-200"
          textInputBackgroundColor="transparent"
          onSelect={(location) => {
            setDestinationLocation(location);
          }}
        />
      </View>
      <CustomButton
        title="Find Now"
        className="mt-5 "
        onPress={() => router.push("./confirm-ride")}
      />
    </RideLayout>
  );
}
