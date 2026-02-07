import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindRide() {
  const router = useRouter();
  return (
    <SafeAreaView className=" items-center justify-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4 z-50 p-2 bg-blue-500 rounded-full"
      >
        <Text className="text-white font-semibold">Back</Text>
      </TouchableOpacity>
      <Text>Find Ride Screen</Text>
    </SafeAreaView>
  );
}
