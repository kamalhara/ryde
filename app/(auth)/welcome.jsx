import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "../constants";

export default function Welcome() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView className="flex items-center justify-between h-full bg-white">
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="w-full flex items-end p-5 justify-end"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px]  bg-[#E2E8F0] rounded-full" />}
        activeDot={
          <View className="w-[32px] h-[4px] rounded-full bg-[#0286ff] " />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Text>{item.title}</Text>
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}
