import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { formatDate, formatTime } from "../lib/utils";

export default function RideCard({
  ride: {
    driver,
    destination_address,
    origin_address,
    fare_price,
    ride_time,
    created_at,
    destination_longitude,
    destination_latitude,
    origin_longitude,
    origin_latitude,
    payment_status,
  },
}) {
  return (
    <View
      className="bg-white rounded-2xl mb-4 overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Accent bar */}
      <View className="h-1 bg-[#0286ff]" />

      <View className="p-4">
        {/* Map & Addresses Section */}
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${origin_longitude},${origin_latitude}&zoom=14&marker=lonlat:${origin_longitude},${origin_latitude};type:material;color:%23ff0000;size:large&marker=lonlat:${destination_longitude},${destination_latitude};type:material;color:%2300ff00;size:large&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-xl"
          />

          <View className="flex flex-col ml-4 gap-y-4 flex-1">
            <View className="flex flex-row gap-x-2 items-center">
              <View className="w-6 h-6 rounded-full bg-green-50 items-center justify-center">
                <Image
                  source={icons.to}
                  className="w-4 h-4"
                  tintColor="#16a34a"
                />
              </View>
              <Text
                className="text-sm text-gray-800 flex-1"
                numberOfLines={1}
                style={{ fontFamily: "Jakarta-SemiBold" }}
              >
                {origin_address}
              </Text>
            </View>

            <View className="flex flex-row gap-x-2 items-center">
              <View className="w-6 h-6 rounded-full bg-red-50 items-center justify-center">
                <Image
                  source={icons.point}
                  className="w-4 h-4"
                  tintColor="#dc2626"
                />
              </View>
              <Text
                className="text-sm text-gray-800 flex-1"
                numberOfLines={1}
                style={{ fontFamily: "Jakarta-SemiBold" }}
              >
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 my-4" />

        {/* Details Section */}
        <View className="gap-y-3">
          <View className="flex flex-row items-center justify-between">
            <Text
              className="text-xs text-gray-400 uppercase tracking-wide"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              Date & Time
            </Text>
            <Text
              className="text-sm text-gray-800"
              style={{ fontFamily: "Jakarta-SemiBold" }}
            >
              {formatDate(created_at)} • {formatTime(ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between">
            <Text
              className="text-xs text-gray-400 uppercase tracking-wide"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              Driver
            </Text>
            <Text
              className="text-sm text-gray-800"
              style={{ fontFamily: "Jakarta-SemiBold" }}
            >
              {driver.first_name} {driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between">
            <Text
              className="text-xs text-gray-400 uppercase tracking-wide"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              Fare
            </Text>
            <Text
              className="text-base text-[#0286ff]"
              style={{ fontFamily: "Jakarta-Bold" }}
            >
              ${(fare_price / 100).toFixed(2)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between">
            <Text
              className="text-xs text-gray-400 uppercase tracking-wide"
              style={{ fontFamily: "Jakarta-Medium" }}
            >
              Status
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${
                payment_status === "Paid" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <Text
                className={`text-xs ${
                  payment_status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                {payment_status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="px-4 pb-4">
        <TouchableOpacity
          onPress={() => {
            router.push("/(authenticated)/rate-driver");
          }}
          onPressIn={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
          className="bg-[#0286ff] py-3 rounded-xl items-center"
        >
          <Text
            className="text-sm text-white"
            style={{ fontFamily: "Jakarta-Bold" }}
          >
            ⭐ Rate Driver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
