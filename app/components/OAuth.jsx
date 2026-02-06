import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const handleGoogleLogin = async () => {};
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/home")} className="w-full">
      <View className="flex-row flex  items-center justify-center mt-4">
        <View className="flex-1 h-[1px] bg-gray-300"></View>
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-gray-300"></View>
      </View>
      <CustomButton
        title="Login with Google"
        className="w-full mt-4"
        bgVariant="outline"
        textVariant="primary"
        iconLeft={<Image source={icons.google} className="w-5 h-5 mx-2" />}
        onPress={handleGoogleLogin}
      />
    </TouchableOpacity>
  );
};

export default OAuth;
