import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
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
      bgColor: "#eff6ff",
      iconColor: "#3b82f6",
    },
    {
      icon: icons.dollar,
      label: "Payment Methods",
      value: "Visa •••• 4242",
      bgColor: "#f0fdf4",
      iconColor: "#22c55e",
    },
    {
      icon: icons.chat,
      label: "Notifications",
      value: "On",
      bgColor: "#fef3c7",
      iconColor: "#f59e0b",
    },
    {
      icon: icons.star,
      label: "Rate the App",
      value: "",
      bgColor: "#fce7f3",
      iconColor: "#ec4899",
    },
    {
      icon: icons.person,
      label: "Invite Friends",
      value: "",
      bgColor: "#f3e8ff",
      iconColor: "#a855f7",
    },
  ];

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="my-6">
          <Text
            className="text-3xl text-gray-900"
            style={{ fontFamily: "Jakarta-Bold" }}
          >
            Profile
          </Text>
          <Text
            className="text-base text-gray-500 mt-2"
            style={{ fontFamily: "Jakarta-Medium" }}
          >
            Manage your account and preferences
          </Text>
        </View>

        {/* Profile Card */}
        <View
          className="bg-white rounded-[32px] p-6 items-center border border-gray-100 mb-2 mt-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 2,
          }}
        >
          {/* Avatar Container with glowing effect */}
          <View className="relative mt-2">
            <View className="absolute inset-0 bg-blue-100 rounded-full scale-110 opacity-50 blur-md" />
            <View className="w-28 h-28 rounded-full bg-white p-1">
              <Image
                source={{ uri: user?.imageUrl }}
                className="w-full h-full rounded-full"
              />
            </View>
            <View
              className="absolute bottom-1 right-1 bg-[#10b981] rounded-full p-1.5 border-4 border-white"
              style={{ elevation: 2 }}
            >
              <Image
                source={icons.checkmark}
                className="w-3.5 h-3.5"
                tintColor="#fff"
              />
            </View>
          </View>

          {/* Name & Email */}
          <Text
            className="text-2xl text-gray-900 mt-5"
            style={{ fontFamily: "Jakarta-Bold" }}
          >
            {user?.fullName ||
              user?.firstName ||
              user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
          </Text>
          <Text
            className="text-base text-gray-500 mt-1"
            style={{ fontFamily: "Jakarta-Medium" }}
          >
            {user?.emailAddresses[0]?.emailAddress}
          </Text>

          {/* Stats Row */}
          <View className="flex flex-row mt-8 w-full bg-blue-50/50 border border-blue-50 rounded-3xl py-5">
            <View className="flex-1 items-center justify-center border-r border-blue-100">
              <Text
                className="text-2xl text-gray-900"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                {rides?.length || 0}
              </Text>
              <Text
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "Jakarta-Medium" }}
              >
                Rides
              </Text>
            </View>
            
            <View className="flex-1 items-center justify-center border-r border-blue-100">
              <View className="flex-row items-center mb-0.5">
                <Text
                  className="text-2xl text-gray-900"
                  style={{ fontFamily: "Jakarta-Bold" }}
                >
                  4.9
                </Text>
                <Image
                  source={icons.star}
                  className="w-4 h-4 ml-1 mb-1"
                  tintColor="#f59e0b"
                />
              </View>
              <Text
                className="text-sm text-gray-500 mt-0.5"
                style={{ fontFamily: "Jakarta-Medium" }}
              >
                Rating
              </Text>
            </View>
            
            <View className="flex-1 items-center justify-center">
              <Text
                className="text-2xl text-gray-900"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                {new Date(user?.createdAt).getFullYear() || "2024"}
              </Text>
              <Text
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "Jakarta-Medium" }}
              >
                Member
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View
          className="bg-white rounded-3xl mt-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPressIn={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
              className={`flex flex-row items-center px-5 py-4 ${
                index < menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: item.bgColor }}
              >
                <Image
                  source={item.icon}
                  className="w-5 h-5"
                  tintColor={item.iconColor}
                  resizeMode="contain"
                />
              </View>
              <Text
                className="flex-1 text-base text-gray-800 ml-4"
                style={{ fontFamily: "Jakarta-SemiBold" }}
              >
                {item.label}
              </Text>
              {item.value ? (
                <Text
                  className="text-sm text-gray-400 mr-2"
                  style={{ fontFamily: "Jakarta-Medium" }}
                >
                  {item.value}
                </Text>
              ) : null}
              <Image
                source={icons.arrowDown}
                className="w-4 h-4"
                tintColor="#d1d5db"
                style={{ transform: [{ rotate: "-90deg" }] }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          onPressIn={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }
          activeOpacity={0.8}
          className="bg-red-500 rounded-full py-4 mt-6 items-center"
          style={{
            shadowColor: "#ef4444",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Jakarta-Bold" }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <Text
          className="text-center text-gray-300 mt-6 mb-4 text-xs"
          style={{ fontFamily: "Jakarta-Medium" }}
        >
          Ryde v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
