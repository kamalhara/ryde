import { useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindRide() {
  const router = useRouter();
  return (
    <SafeAreaView className=" items-center justify-center">
      <Text>Find Ride Screen</Text>
    </SafeAreaView>
  );
}
