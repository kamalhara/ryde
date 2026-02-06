import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => router.push("/signup")}
        className="w-full"
      >
        <Text>back</Text>
      </TouchableOpacity>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
