import { Image, Text, View } from "react-native";

export default function GoogleInputText({ handlePress, icon, ContainerStyle }) {
  return (
    <View
      className={` ${ContainerStyle} flex flex-row items-center justify-start gap-2 px-4 py-3 mb-5 relative z-50`}
    >
      <Image source={icon} className="w-5 h-5 absolute left-4" />
      <Text className="text-gray-500 mx-8">Where do you want to go?</Text>
    </View>
  );
}
