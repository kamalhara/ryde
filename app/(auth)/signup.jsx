import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import InputField from "../components/InputField";
import { icons, images } from "../constants";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <ScrollView className="bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute  text-black bottom-5 left-5 text-2xl font-semibold">
            Create your account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => {
              setForm({ ...form, name: value });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
