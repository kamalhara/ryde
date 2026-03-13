import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomButton from "../../components/CustomButton";
import { onboarding } from "../../constants";

const { width } = Dimensions.get("window");

export default function Welcome() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push("/signup");
        }}
        className="absolute top-14 right-5 z-10 px-4 py-2 rounded-full"
        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      >
        <Text className="text-gray-600 text-sm font-semibold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper Content */}
      <View className="flex-1 justify-center">
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View
              className="w-2 h-2 bg-gray-200 rounded-full mx-1"
              style={{ marginBottom: -20 }}
            />
          }
          activeDot={
            <View
              className="w-8 h-2 bg-[#0286ff] rounded-full mx-1"
              style={{ marginBottom: -20 }}
            />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
          paginationStyle={{ bottom: 30 }}
        >
          {onboarding.map((item) => (
            <View
              key={item.id}
              className="flex-1 items-center justify-center px-6"
            >
              {/* Illustration with subtle background */}
              <View
                className="w-full items-center justify-center mb-8"
                style={{
                  height: width * 0.7,
                }}
              >
                <View
                  className="absolute w-64 h-64 rounded-full"
                  style={{
                    backgroundColor: "rgba(2, 134, 255, 0.06)",
                  }}
                />
                <View
                  className="absolute w-48 h-48 rounded-full"
                  style={{
                    backgroundColor: "rgba(2, 134, 255, 0.08)",
                  }}
                />
                <Image
                  source={item.image}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>

              {/* Title */}
              <Text
                className="text-gray-900 text-[28px] font-bold text-center leading-9"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                {item.title}
              </Text>

              {/* Description */}
              <Text className="text-gray-400 text-base text-center mt-4 px-4 leading-6">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Bottom Section */}
      <View className="px-6 pb-8">
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          className="w-full"
          onPress={() => {
            if (isLastSlide) {
              router.push("/signup");
            } else {
              swiperRef.current.scrollBy(1);
            }
          }}
          onPressIn={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
      </View>
    </SafeAreaView>
  );
}
