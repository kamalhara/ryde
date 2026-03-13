import { useUser } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { images } from "../constants";
import { fetchAPI } from "../lib/fetch";
import CustomButton from "./CustomButton";

export default function Payment({
  fullName,
  email,
  driverId,
  rideTime,
  amount,
  userLatitude,
  userLongitude,
  userAddress,
  destinationLatitude,
  destinationLongitude,
  destinationAddress,
}) {
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookRide = async () => {
    setLoading(true);
    try {
      const response = await fetchAPI("/(api)/ride/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime,
          fare_price: parseFloat(amount) * 100, // Store as cents
          payment_status: "paid",
          driver_id: driverId,
          user_id: user?.id,
        }),
      });

      setSuccess(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", "Failed to book ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomButton
        title={loading ? "Booking..." : "Confirm Booking"}
        className="mt-2"
        disabled={loading}
        onPress={handleBookRide}
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />
          <Text className="text-2xl font-bold text-center mt-5">
            Ride Booked Successfully
          </Text>
          <Text className="text-center text-md text-gray-500 font-medium mt-2">
            Thanks for your booking. Your driver will arrive soon.
          </Text>
          <CustomButton
            title="Back to Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(authenticated)/(tabs)/home");
            }}
            onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
}
