import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "../../store";

export default function FindRide() {
  const {
    userAddress,
    destinationAddress,
    setUserAddress,
    setDestinationAddress,
  } = useLocationStore();
  return (
    <SafeAreaView>
      <Text className="text-xl">You are here : {userAddress}</Text>
      <Text className="text-xl">You are going to : {destinationAddress}</Text>
    </SafeAreaView>
  );
}
