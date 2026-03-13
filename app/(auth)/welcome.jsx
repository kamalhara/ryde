import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { onboarding } from "../../constants";

const { width, height } = Dimensions.get("window");

export default function Welcome() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  // Animated values for fade/scale transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = useCallback(
    (nextIndex) => {
      // Fade out + scale down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveIndex(nextIndex);
        // Fade in + scale up
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [fadeAnim, scaleAnim],
  );

  const currentSlide = onboarding[activeIndex];

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
        <Text
          className="text-gray-600 text-sm"
          style={{ fontFamily: "Jakarta-SemiBold" }}
        >
          Skip
        </Text>
      </TouchableOpacity>

      {/* Slide Content with Animation */}
      <View className="flex-1 justify-center items-center px-6">
        <Animated.View
          className="items-center justify-center w-full"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* Illustration */}
          <View
            className="w-full items-center justify-center mb-8"
            style={{ height: width * 0.7 }}
          >
            <View
              className="absolute w-64 h-64 rounded-full"
              style={{ backgroundColor: "rgba(2, 134, 255, 0.06)" }}
            />
            <View
              className="absolute w-48 h-48 rounded-full"
              style={{ backgroundColor: "rgba(2, 134, 255, 0.08)" }}
            />
            <Image
              source={currentSlide.image}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text
            className="text-gray-900 text-[28px] text-center leading-9"
            style={{ fontFamily: "Jakarta-Bold" }}
          >
            {currentSlide.title}
          </Text>

          {/* Description */}
          <Text
            className="text-gray-400 text-base text-center mt-4 px-4 leading-6"
            style={{ fontFamily: "Jakarta-Medium" }}
          >
            {currentSlide.description}
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <View className="px-6 pb-8">
        {/* Progress Dots */}
        <View className="flex-row justify-center mb-6">
          {onboarding.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (index !== activeIndex) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  animateTransition(index);
                }
              }}
              className="px-1 py-2"
            >
              <View
                className={`h-2 rounded-full ${
                  index === activeIndex
                    ? "w-8 bg-[#0286ff]"
                    : "w-2 bg-gray-200"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          className="w-full"
          onPress={() => {
            if (isLastSlide) {
              router.push("/signup");
            } else {
              animateTransition(activeIndex + 1);
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
