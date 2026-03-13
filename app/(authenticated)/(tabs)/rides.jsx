import { useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "../../../components/RideCard";
import { images } from "../../../constants";
import { useDevAuthStore } from "../../../store";
import { useFetch } from "../../../lib/fetch";

export default function Rides() {
  const { user: clerkUser } = useUser();
  const { isDevLoggedIn, devUser } = useDevAuthStore();
  const user = isDevLoggedIn ? devUser : clerkUser;
  const { data: rides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={rides || []}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) =>
          item.ride_id?.toString() || index.toString()
        }
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={() => (
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-2xl font-bold text-gray-900">Your Rides</Text>
            {rides?.length > 0 && (
              <View className="bg-green-50 px-3 py-1 rounded-full">
                <Text className="text-sm font-semibold text-green-600">
                  {rides.length} {rides.length === 1 ? "ride" : "rides"}
                </Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-10">
            {loading ? (
              <Text className="text-lg text-gray-500">Loading rides...</Text>
            ) : (
              <>
                <Image
                  source={images.noResult}
                  className="h-40 w-40"
                  resizeMode="contain"
                />
                <Text className="text-lg font-semibold text-gray-800 mt-4">
                  No rides yet
                </Text>
                <Text className="text-sm text-gray-500 mt-1 text-center px-10">
                  Your ride history will appear here once you book your first
                  ride.
                </Text>
              </>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
