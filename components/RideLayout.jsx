import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
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
          <View className="flex flex-col h-screen bg-blue-500">
            <View
              className="absolute left-0 right-0 flex flex-row items-center justify-start px-5 z-10"
              style={{ top: insets.top + 12 }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <View className="w-10 h-10 items-center justify-center rounded-full bg-white">
                  <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </View>
              </TouchableOpacity>
              <Text className="text-xl font-bold ml-5">
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
