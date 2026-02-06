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
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm mb-3 shadow-neutral-300">
      <View className="flex flex-col items-center justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${origin_longitude},${origin_latitude}&zoom=14&marker=lonlat:${origin_longitude},${origin_latitude};type:material;color:%23ff0000;size:large&marker=lonlat:${destination_longitude},${destination_latitude};type:material;color:%2300ff00;size:large&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row gap-x-2 items-center">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-medium" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>

            <View className="flex flex-row gap-x-2 items-center">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-medium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex items-center justify-center flex-col w-full mt-5 rounded-lg p-3 ">
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md text-gray-500 font-medium">
              Date & Time
            </Text>
            <Text className="text-md text-gray-500 font-medium">
              {formatDate(created_at)} {formatTime(ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md text-gray-500 font-medium">Driver</Text>
            <Text className="text-md text-gray-500 font-medium">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md text-gray-500 font-medium">
              Car Seats{" "}
            </Text>
            <Text className="text-md text-gray-500 font-medium">
              {driver.car_seats}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md text-gray-500 font-medium">
              Payment Status
            </Text>
            <Text
              className={`text-md font-medium ${payment_status === "Paid" ? "text-green-500" : "text-red-500"}`}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
