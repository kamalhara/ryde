import { Text, View } from "react-native";
import OSMSearchBar from "../../components/OsmSearchBar";
import RideLayout from "../../components/RideLayout";
import { icons } from "../../constants";
import { useLocationStore } from "../../store";

export default function FindRide() {
  const {
    userAddress,
    destinationAddress,
    setUserAddress,
    setDestinationAddress,
  } = useLocationStore();
  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-bold mb-3">From</Text>
        <OSMSearchBar
          icon={icons.target}
          initalLocation={userAddress}
          ContainerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
        />
      </View>

      <View className="my-3">
        <Text className="text-lg font-bold mb-3">To</Text>
        <OSMSearchBar
          icon={icons.map}
          initalLocation={userAddress}
          ContainerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          onSelect={(location) => {
            setDestinationAddress(location);
          }}
        />
      </View>
    </RideLayout>
  );
}
