import { useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import { ChatItemSkeleton } from "../../../components/Skeleton";
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
          <View className="my-6">
            <Text
              className="text-3xl text-gray-900"
              style={{ fontFamily: "Jakarta-Bold" }}
            >
              Messages
            </Text>
            <Text
              className="text-base text-gray-500 mt-2"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              Chat with your recent drivers
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            className="bg-white rounded-2xl mb-3 p-4 flex flex-row items-center border border-gray-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* Driver Avatar */}
            <View className="relative">
              <View className="w-14 h-14 rounded-full bg-blue-50 items-center justify-center overflow-hidden">
                <Image
                  source={{ uri: item.profileImage }}
                  className="w-full h-full"
                />
              </View>
              <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
            </View>

            {/* Message Content */}
            <View className="flex-1 ml-4 justify-center">
              <View className="flex flex-row items-center justify-between mb-1">
                <Text
                  className="text-base text-gray-900"
                  style={{ fontFamily: "Jakarta-Bold" }}
                >
                  {item.driverName}
                </Text>
                <Text
                  className="text-xs text-gray-400"
                  style={{ fontFamily: "Jakarta-Medium" }}
                >
                  {formatTimeAgo(item.date)}
                </Text>
              </View>
              <Text
                className="text-sm text-gray-500"
                style={{ fontFamily: "Jakarta-Medium" }}
                numberOfLines={1}
              >
                Ride to {item.lastRide}
              </Text>
            </View>

            {/* Unread Badge */}
            {item.rideCount > 1 && (
              <View className="bg-[#0286ff] w-6 h-6 rounded-full items-center justify-center ml-3">
                <Text
                  className="text-xs text-white"
                  style={{ fontFamily: "Jakarta-Bold" }}
                >
                  {item.rideCount}
                </Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-10">
            {loading ? (
              <View className="w-full gap-y-3">
                <ChatItemSkeleton />
                <ChatItemSkeleton />
                <ChatItemSkeleton />
                <ChatItemSkeleton />
                <ChatItemSkeleton />
              </View>
            ) : (
              <View className="items-center justify-center py-10">
                <View className="w-48 h-48 bg-blue-50 rounded-full items-center justify-center mb-6">
                  <Image
                    source={images.message}
                    className="h-28 w-28 opacity-70"
                    resizeMode="contain"
                  />
                </View>
                <Text
                  className="text-2xl text-gray-900 mt-2 text-center"
                  style={{ fontFamily: "Jakarta-Bold" }}
                >
                  No messages
                </Text>
                <Text
                  className="text-base text-gray-500 mt-3 text-center px-8 leading-6"
                  style={{ fontFamily: "Jakarta-Medium" }}
                >
                  Your conversations with drivers will appear here after you
                  book a ride.
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
