import { useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "../../../components/RideCard";
import { RideCardSkeleton } from "../../../components/Skeleton";
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
          <View className="my-6">
            <View className="flex flex-row items-center justify-between">
              <Text
                className="text-3xl text-gray-900"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                Your Rides
              </Text>
              {rides?.length > 0 && (
                <View className="bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  <Text
                    className="text-sm text-[#0286ff]"
                    style={{ fontFamily: "Jakarta-SemiBold" }}
                  >
                    {rides.length} {rides.length === 1 ? "Ride" : "Rides"}
                  </Text>
                </View>
              )}
            </View>
            <Text
              className="text-base text-gray-500 mt-2"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              View your recent journey history
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-10">
            {loading ? (
              <View className="w-full gap-y-4">
                <RideCardSkeleton />
                <RideCardSkeleton />
                <RideCardSkeleton />
                <RideCardSkeleton />
              </View>
            ) : (
              <View className="items-center justify-center py-10">
                <View className="w-48 h-48 bg-gray-50 rounded-full items-center justify-center mb-6">
                  <Image
                    source={images.noResult}
                    className="h-32 w-32 opacity-80"
                    resizeMode="contain"
                  />
                </View>
                <Text
                  className="text-2xl text-gray-900 mt-2 text-center"
                  style={{ fontFamily: "Jakarta-Bold" }}
                >
                  No rides found
                </Text>
                <Text
                  className="text-base text-gray-500 mt-3 text-center px-8 leading-6"
                  style={{ fontFamily: "Jakarta-Medium" }}
                >
                  You haven&apos;t booked any rides yet. Your past journeys will
                  appear here.
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
