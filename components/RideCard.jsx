import { Image, Text, View } from "react-native";
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
      className="bg-white rounded-2xl mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
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
                className="text-sm font-JakartaMedium text-gray-800 flex-1"
                numberOfLines={1}
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
                className="text-sm font-JakartaMedium text-gray-800 flex-1"
                numberOfLines={1}
              >
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 my-4" />

        {/* Details Section */}
        <View className="space-y-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-sm font-JakartaSemiBold text-gray-800">
              {formatDate(created_at)} • {formatTime(ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between mt-3">
            <Text className="text-sm font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-sm font-JakartaSemiBold text-gray-800">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between mt-3">
            <Text className="text-sm font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-sm font-JakartaSemiBold text-gray-800">
              {driver.car_seats}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between mt-3">
            <Text className="text-sm font-JakartaMedium text-gray-500">
              Payment
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${
                payment_status === "Paid" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <Text
                className={`text-xs font-JakartaSemiBold ${
                  payment_status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {payment_status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
