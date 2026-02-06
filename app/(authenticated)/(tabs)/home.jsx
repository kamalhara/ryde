import { useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "../../components/RideCard";
import { icons, images } from "../../constants";
import rides from "../../data/rides";

export default function Home() {
  const { user } = useUser();
  const isLoading = false;

  const handleSignOut = () => {
    // Implement sign-out logic here
  };

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={rides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!isLoading ? (
              <>
                <Image source={images.noResult} className="h-40 w-40" />
                <Text className="text-lg text-gray-500">
                  No rides available
                </Text>
              </>
            ) : (
              <Text className="text-lg text-gray-500">Loading...</Text>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-lg font-bold">
                Welcome{"  "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
                👋🏻
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="flex flex-row items-center gap-x-1"
              >
                <Image source={icons.out} className="h-5 w-5" />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}
