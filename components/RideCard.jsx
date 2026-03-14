import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { icons } from "../constants";
import { formatDate, formatTime } from "../lib/utils";
import { useDriverStore } from "../store";

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
  const [showRating, setShowRating] = useState(false);
  const { selectedDriver } = useDriverStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const isSelected = selectedDriver === driver.id;

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
      <View className="h-1 bg-[#0286ff]" />

      <View className="p-4">
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

        <View className="h-[1px] bg-gray-100 my-4" />

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
      <View className="px-4 pb-4 mt-2">
        <TouchableOpacity
          onPress={() => {
            setShowRating(true);
          }}
          onPressIn={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
          className="bg-[#0286ff]/10 py-3.5 rounded-2xl items-center flex-row justify-center"
        >
          <Ionicons name="star" size={18} color="#0286ff" />
          <Text
            className="text-sm text-[#0286ff] ml-2"
            style={{ fontFamily: "Jakarta-Bold" }}
          >
            Rate Driver
          </Text>
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        avoidKeyboard={true}
        isVisible={showRating}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setShowRating(false)}
        onBackButtonPress={() => setShowRating(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View className="bg-white rounded-t-3xl p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text
              className="text-xl text-gray-900"
              style={{ fontFamily: "Jakarta-Bold" }}
            >
              Rate Your Experience
            </Text>
            <TouchableOpacity
              onPress={() => setShowRating(false)}
              className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#4b5563" />
            </TouchableOpacity>
          </View>

          {/* Driver Info */}
          <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
            <Image
              source={{ uri: driver.profile_image_url }}
              className="w-14 h-14 rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text
                className="text-lg text-gray-900"
                style={{ fontFamily: "Jakarta-SemiBold" }}
              >
                {driver.first_name} {driver.last_name}
              </Text>

              <View className="flex-row items-center mt-1">
                <Image
                  source={icons.star}
                  className="w-4 h-4"
                  tintColor="#f59e0b"
                />
                <Text
                  className="text-sm text-gray-600 ml-1"
                  style={{ fontFamily: "Jakarta-Medium" }}
                >
                  4.8
                </Text>
              </View>
            </View>
          </View>

          {/* Rating Prompt */}
          <Text
            className="text-center text-gray-500 mb-4"
            style={{ fontFamily: "Jakarta-Medium" }}
          >
            How was your trip with {driver.first_name}?
          </Text>

          {/* Rating Stars */}
          <View className="flex-row justify-center gap-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => {
                  setRating(star);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
                className={`w-12 h-12 items-center justify-center rounded-full ${
                  rating >= star ? "bg-amber-100" : "bg-gray-50"
                }`}
              >
                <Ionicons
                  name="star"
                  size={26}
                  color={rating >= star ? "#f59e0b" : "#d1d5db"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Dynamic Rating Text */}
          <View className="h-8 items-center justify-center mb-6">
            {rating > 0 && (
              <Text
                className="text-lg transition-colors"
                style={{
                  fontFamily: "Jakarta-Bold",
                  color:
                    rating <= 2
                      ? "#ef4444"
                      : rating === 3
                        ? "#f59e0b"
                        : "#10b981",
                }}
              >
                {rating === 1
                  ? "Terrible 😞"
                  : rating === 2
                    ? "Bad 🫤"
                    : rating === 3
                      ? "Average 😐"
                      : rating === 4
                        ? "Good 🙂"
                        : "Excellent 🤩!"}
              </Text>
            )}
          </View>

          {/* Comment Input */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
            <TextInput
              placeholder="Add a comment... (Optional)"
              placeholderTextColor="#9ca3af"
              value={comment}
              onChangeText={setComment}
              multiline
              textAlignVertical="top"
              className="text-base text-gray-800"
              style={{ fontFamily: "Jakarta-Medium", minHeight: 100 }}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            disabled={rating === 0}
            onPress={() => {
              console.log("Rating:", rating);
              console.log("Comment:", comment);
              setShowRating(false);
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              // Resetting rating and comment string for future ratings on the same component instance
              setTimeout(() => {
                setRating(0);
                setComment("");
              }, 400);
            }}
            className={`py-4 items-center rounded-full mb-4 ${
              rating === 0 ? "bg-blue-200" : "bg-[#0286ff]"
            }`}
          >
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Jakarta-Bold" }}
            >
              Submit Rating
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </View>
  );
}
