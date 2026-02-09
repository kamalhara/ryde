import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import RideLayout from "../../components/RideLayout";
import { icons } from "../../constants";
import { driversData } from "../../data/driver";
import { useDriverStore, useLocationStore } from "../../store";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { selectedDriver } = useDriverStore();

  // Get driver details from driversData using selectedDriver id
  const driverDetails = driversData?.find(
    (driver) => driver.id === String(selectedDriver),
  );

  // Calculate estimated values (since not in data)
  const estimatedPrice = driverDetails
    ? (15 + Math.random() * 10).toFixed(2)
    : "0.00";
  const estimatedTime = driverDetails ? Math.floor(5 + Math.random() * 15) : 0;

  return (
    <RideLayout title="Book Ride" snapPoints={["70%", "90%"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-JakartaBold text-gray-900">
            Ride Summary
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Review your trip details before booking
          </Text>
        </View>

        {/* Driver Card */}
        {driverDetails ? (
          <View
            className="bg-white rounded-3xl p-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View className="flex flex-row items-center">
              {/* Driver Image */}
              <View className="relative">
                <Image
                  source={{ uri: driverDetails.profile_image_url }}
                  className="w-20 h-20 rounded-2xl"
                  style={{ borderWidth: 3, borderColor: "#22c55e" }}
                />
                <View className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5">
                  <Image
                    source={icons.checkmark}
                    className="w-3 h-3"
                    tintColor="#fff"
                  />
                </View>
              </View>

              {/* Driver Info */}
              <View className="flex-1 ml-4">
                <Text className="text-xl font-JakartaBold text-gray-900">
                  {driverDetails.first_name} {driverDetails.last_name}
                </Text>

                <View className="flex flex-row items-center mt-1">
                  <View className="flex flex-row items-center bg-amber-50 px-2 py-1 rounded-full">
                    <Image
                      source={icons.star}
                      className="w-4 h-4"
                      tintColor="#f59e0b"
                    />
                    <Text className="text-sm font-JakartaSemiBold text-amber-600 ml-1">
                      {driverDetails.rating}
                    </Text>
                  </View>
                  <Text className="text-gray-400 mx-2">•</Text>
                  <Text className="text-sm text-gray-500">
                    {driverDetails.car_seats} seats
                  </Text>
                </View>
              </View>

              {/* Car Image */}
              <Image
                source={{ uri: driverDetails.car_image_url }}
                className="w-20 h-16"
                resizeMode="contain"
              />
            </View>
          </View>
        ) : (
          <View className="bg-red-50 rounded-2xl p-5 mb-4 items-center">
            <Text className="text-red-500 font-JakartaMedium">
              No driver selected. Please go back and select a driver.
            </Text>
          </View>
        )}

        {/* Trip Details Card */}
        <View
          className="bg-white rounded-3xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <Text className="text-lg font-JakartaBold text-gray-900 mb-4">
            Trip Details
          </Text>

          {/* Pickup Location */}
          <View className="flex flex-row items-start mb-4">
            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
              <Image
                source={icons.point}
                className="w-5 h-5"
                tintColor="#22c55e"
              />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs font-JakartaMedium text-gray-400 uppercase tracking-wide">
                Pickup
              </Text>
              <Text
                className="text-base font-JakartaSemiBold text-gray-900 mt-0.5"
                numberOfLines={2}
              >
                {userAddress || "Current Location"}
              </Text>
            </View>
          </View>

          {/* Divider Line */}
          <View className="ml-5 w-0.5 h-6 bg-gray-200 mb-2" />

          {/* Destination Location */}
          <View className="flex flex-row items-start">
            <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center">
              <Image
                source={icons.to}
                className="w-5 h-5"
                tintColor="#ef4444"
              />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs font-JakartaMedium text-gray-400 uppercase tracking-wide">
                Destination
              </Text>
              <Text
                className="text-base font-JakartaSemiBold text-gray-900 mt-0.5"
                numberOfLines={2}
              >
                {destinationAddress || "Not selected"}
              </Text>
            </View>
          </View>
        </View>

        {/* Price & Time Card */}
        <View
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-5 mb-6"
          style={{
            backgroundColor: "#22c55e",
            shadowColor: "#22c55e",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <View className="flex flex-row justify-between">
            {/* Price */}
            <View className="flex-1 items-center border-r border-green-400">
              <Text className="text-green-200 text-sm font-JakartaMedium">
                Estimated Fare
              </Text>
              <Text className="text-white text-3xl font-JakartaBold mt-1">
                ${estimatedPrice}
              </Text>
            </View>

            {/* Time */}
            <View className="flex-1 items-center">
              <Text className="text-green-200 text-sm font-JakartaMedium">
                Pickup Time
              </Text>
              <Text className="text-white text-3xl font-JakartaBold mt-1">
                {estimatedTime} min
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View
          className="bg-white rounded-3xl p-4 mb-6 flex-row items-center justify-between"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center">
              <Text className="text-2xl">💳</Text>
            </View>
            <View className="ml-3">
              <Text className="text-base font-JakartaSemiBold text-gray-900">
                Payment Method
              </Text>
              <Text className="text-sm text-gray-500">
                Cash • Change after ride
              </Text>
            </View>
          </View>
          <Image
            source={icons.arrowDown}
            className="w-5 h-5"
            tintColor="#9ca3af"
          />
        </View>

        {/* Confirm Button */}
        <CustomButton
          title="Confirm Booking"
          className="mt-2"
          onPress={() => {
            // Handle booking confirmation
            router.push("/(authenticated)/(tabs)/rides");
          }}
        />

        {/* Cancel Link */}
        <View className="items-center mt-4">
          <Text
            className="text-gray-500 font-JakartaMedium"
            onPress={() => router.back()}
          >
            Cancel
          </Text>
        </View>
      </ScrollView>
    </RideLayout>
  );
};

export default BookRide;
