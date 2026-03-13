import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../../constants";
import { useDevAuthStore } from "../../../store";
import { useFetch } from "../../../lib/fetch";

export default function Profile() {
  const { user: clerkUser } = useUser();
  const { signOut } = useAuth();
  const { isDevLoggedIn, devUser, devLogout } = useDevAuthStore();
  const user = isDevLoggedIn ? devUser : clerkUser;
  const router = useRouter();
  const { data: rides } = useFetch(`/(api)/ride/${user?.id}`);

  const handleSignOut = () => {
    if (isDevLoggedIn) {
      devLogout();
    } else {
      signOut();
    }
    router.replace("/(auth)/signup");
  };

  const menuItems = [
    {
      icon: icons.list,
      label: "My Rides",
      value: `${rides?.length || 0} trips`,
    },
    { icon: icons.dollar, label: "Payment Methods", value: "Visa •••• 4242" },
    { icon: icons.chat, label: "Notifications", value: "On" },
    { icon: icons.star, label: "Rate the App", value: "" },
    { icon: icons.person, label: "Invite Friends", value: "" },
  ];

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Text className="text-2xl font-bold text-gray-900 my-5">Profile</Text>

        {/* Profile Card */}
        <View
          className="bg-white rounded-2xl p-6 items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Avatar */}
          <View className="relative">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-24 h-24 rounded-full"
              style={{ borderWidth: 3, borderColor: "#22c55e" }}
            />
            <View className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-2 border-white">
              <Image
                source={icons.checkmark}
                className="w-3 h-3"
                tintColor="#fff"
              />
            </View>
          </View>

          {/* Name & Email */}
          <Text className="text-xl font-bold text-gray-900 mt-4">
            {user?.fullName ||
              user?.firstName ||
              user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {user?.emailAddresses[0]?.emailAddress}
          </Text>

          {/* Stats Row */}
          <View className="flex flex-row mt-6 w-full">
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-900">
                {rides?.length || 0}
              </Text>
              <Text className="text-xs text-gray-500 mt-1">Rides</Text>
            </View>
            <View className="w-[1px] bg-gray-200" />
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-900">4.9</Text>
              <Text className="text-xs text-gray-500 mt-1">Rating</Text>
            </View>
            <View className="w-[1px] bg-gray-200" />
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-900">
                {new Date(user?.createdAt).getFullYear() || "2024"}
              </Text>
              <Text className="text-xs text-gray-500 mt-1">Member</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View
          className="bg-white rounded-2xl mt-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              className={`flex flex-row items-center px-5 py-4 ${
                index < menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                <Image
                  source={item.icon}
                  className="w-5 h-5"
                  tintColor="#6b7280"
                  resizeMode="contain"
                />
              </View>
              <Text className="flex-1 text-base font-medium text-gray-800 ml-4">
                {item.label}
              </Text>
              {item.value ? (
                <Text className="text-sm text-gray-400 mr-2">{item.value}</Text>
              ) : null}
              <Image
                source={icons.arrowDown}
                className="w-4 h-4"
                tintColor="#9ca3af"
                style={{ transform: [{ rotate: "-90deg" }] }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          activeOpacity={0.8}
          className="bg-red-500 rounded-full py-4 mt-6 items-center"
          style={{
            shadowColor: "#ef4444",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text className="text-white text-lg font-bold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
