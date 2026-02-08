import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";

const DriverCard = ({ item, selected, setSelected }) => {
  const isSelected = selected === item.id;

  return (
    <TouchableOpacity
      onPress={setSelected}
      activeOpacity={0.7}
      className={`${
        isSelected
          ? "bg-green-50 border-2 border-green-500"
          : "bg-white border border-gray-100"
      } flex flex-row items-center justify-between py-4 px-4 rounded-2xl mb-3 shadow-sm`}
      style={{
        shadowColor: isSelected ? "#22c55e" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isSelected ? 0.15 : 0.08,
        shadowRadius: 8,
        elevation: isSelected ? 4 : 2,
      }}
    >
      {/* Driver Profile Image */}
      <View className="relative">
        <Image
          source={{ uri: item.profile_image_url }}
          className="w-16 h-16 rounded-full"
          style={{
            borderWidth: 2,
            borderColor: isSelected ? "#22c55e" : "#e5e7eb",
          }}
        />
        {isSelected && (
          <View className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <Image
              source={icons.checkmark}
              className="w-3 h-3"
              tintColor="#fff"
            />
          </View>
        )}
      </View>

      {/* Driver Info */}
      <View className="flex-1 flex flex-col items-start justify-center ml-4">
        {/* Name and Rating Row */}
        <View className="flex flex-row items-center justify-start mb-2">
          <Text
            className={`text-lg font-JakartaSemiBold ${
              isSelected ? "text-green-700" : "text-gray-900"
            }`}
          >
            {item.title}
          </Text>

          <View className="flex flex-row items-center bg-amber-50 px-2 py-0.5 rounded-full ml-2">
            <Image
              source={icons.star}
              className="w-3.5 h-3.5"
              tintColor="#f59e0b"
            />
            <Text className="text-sm font-JakartaSemiBold text-amber-600 ml-1">
              4.8
            </Text>
          </View>
        </View>

        {/* Trip Details Row */}
        <View className="flex flex-row items-center flex-wrap">
          {/* Price */}
          <View className="flex flex-row items-center bg-green-50 px-2 py-1 rounded-lg mr-2">
            <Image
              source={icons.dollar}
              className="w-4 h-4"
              tintColor="#16a34a"
            />
            <Text className="text-sm font-JakartaBold text-green-600 ml-1">
              ${item.price}
            </Text>
          </View>

          {/* Time */}
          <View className="flex flex-row items-center mr-2">
            <Text className="text-xs font-JakartaMedium text-gray-500">
              ⏱ {formatTime(item.time)}
            </Text>
          </View>

          {/* Seats */}
          <View className="flex flex-row items-center bg-blue-50 px-2 py-1 rounded-lg">
            <Text className="text-xs font-JakartaMedium text-blue-600">
              🪑 {item.car_seats} seats
            </Text>
          </View>
        </View>
      </View>

      {/* Car Image */}
      <View className="items-center justify-center">
        <Image
          source={{ uri: item.car_image_url }}
          className="h-16 w-20"
          resizeMode="contain"
        />
        <Text className="text-xs font-JakartaMedium text-gray-400 mt-1">
          Premium
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
