import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { images } from "../constants";
import CustomButton from "./CustomButton";

export default function Payment() {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <CustomButton
        title="Confirm Booking"
        className="mt-2"
        onPress={() => {
          // Handle booking confirmation
          setSuccess(true);
        }}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28  mt-5" />
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
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
}
