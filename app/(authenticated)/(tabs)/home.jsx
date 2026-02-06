import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "../../components/RideCard";
import rides from "../../data/rides";

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={rides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
      ></FlatList>
    </SafeAreaView>
  );
}
