import { Image, Text, View } from "react-native";

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
  },
}) {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm mb-3 shadow-neutral-300">
      <View className="flex flex-row items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${origin_longitude},${origin_latitude}&zoom=14&marker=lonlat:${origin_longitude},${origin_latitude};type:material;color:%23ff0000;size:large&marker=lonlat:${destination_longitude},${destination_latitude};type:material;color:%2300ff00;size:large&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
        </View>
      </View>
      <Text className=" text-3xl">{driver.first_name}</Text>
    </View>
  );
}
