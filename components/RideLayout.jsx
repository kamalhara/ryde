import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef } from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { icons } from "../constants";
import Map from "./Map";

export default function RideLayout({ children, title, snapPoints }) {
  const bottomSheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 bg-white">
          <View className="flex flex-col h-screen bg-gray-100">
            <View
              className="absolute left-0 right-0 flex flex-row items-center justify-start px-5 z-10"
              style={{ top: insets.top + 12 }}
            >
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.back();
                }}
              >
                <View
                  className="w-10 h-10 items-center justify-center rounded-full bg-white"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.12,
                    shadowRadius: 6,
                    elevation: 4,
                  }}
                >
                  <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                </View>
              </TouchableOpacity>
              <Text
                className="text-xl text-gray-900 ml-4"
                style={{ fontFamily: "Jakarta-Bold" }}
              >
                {title || "Go Back"}
              </Text>
            </View>
            <Map />
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["40%", "85%"]}
            index={1}
            keyboardBehavior="extend"
            handleIndicatorStyle={{
              backgroundColor: "#d1d5db",
              width: 40,
              height: 4,
              borderRadius: 2,
            }}
            backgroundStyle={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                <View style={{ flex: 1 }}>{children}</View>
              </TouchableWithoutFeedback>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}
