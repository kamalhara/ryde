import { useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import { useDevAuthStore } from "../../../store";
import { useFetch } from "../../../lib/fetch";

export default function Chat() {
  const { user: clerkUser } = useUser();
  const { isDevLoggedIn, devUser } = useDevAuthStore();
  const user = isDevLoggedIn ? devUser : clerkUser;
  const { data: rides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  // Extract unique drivers from ride history to show conversations
  const conversations = rides
    ? Object.values(
        rides.reduce((acc, ride) => {
          const driverId = ride.driver?.driver_id;
          if (driverId && !acc[driverId]) {
            acc[driverId] = {
              id: driverId,
              driverName: `${ride.driver.first_name} ${ride.driver.last_name}`,
              profileImage: ride.driver.profile_image_url,
              lastRide: ride.destination_address,
              date: ride.created_at,
              rideCount: 1,
            };
          } else if (driverId && acc[driverId]) {
            acc[driverId].rideCount += 1;
            if (new Date(ride.created_at) > new Date(acc[driverId].date)) {
              acc[driverId].lastRide = ride.destination_address;
              acc[driverId].date = ride.created_at;
            }
          }
          return acc;
        }, {}),
      )
    : [];

  const formatTimeAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={() => (
          <View className="my-5">
            <Text className="text-2xl font-bold text-gray-900">Messages</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Chat with your drivers
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            className="bg-white rounded-2xl mb-3 p-4 flex flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {/* Driver Avatar */}
            <View className="relative">
              <Image
                source={{ uri: item.profileImage }}
                className="w-14 h-14 rounded-full"
                style={{ borderWidth: 2, borderColor: "#e5e7eb" }}
              />
              <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
            </View>

            {/* Message Content */}
            <View className="flex-1 ml-4">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-base font-semibold text-gray-900">
                  {item.driverName}
                </Text>
                <Text className="text-xs text-gray-400">
                  {formatTimeAgo(item.date)}
                </Text>
              </View>
              <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
                Ride to {item.lastRide}
              </Text>
            </View>

            {/* Unread Badge */}
            {item.rideCount > 1 && (
              <View className="bg-green-500 w-6 h-6 rounded-full items-center justify-center ml-3">
                <Text className="text-xs font-bold text-white">
                  {item.rideCount}
                </Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-10">
            {loading ? (
              <Text className="text-lg text-gray-500">
                Loading conversations...
              </Text>
            ) : (
              <>
                <Image
                  source={images.message}
                  className="h-40 w-40"
                  resizeMode="contain"
                />
                <Text className="text-lg font-semibold text-gray-800 mt-4">
                  No messages yet
                </Text>
                <Text className="text-sm text-gray-500 mt-1 text-center px-10">
                  Start a conversation with your driver after booking a ride.
                </Text>
              </>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
